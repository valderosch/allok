import json
from django.shortcuts import render
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import csrf_exempt
from geopy.distance import geodesic
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .seralizers import *


def index(request):
    return render(request, 'serverapp/index.html')

# Camera Data Input
@csrf_exempt
def save_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        camera = data.get('camera')
        all_spaces = data.get('spaces').get('all')
        free_spaces = data.get('spaces').get('free')
        status = data.get('spaces').get('status')
        updated_at = datetime.strptime(data.get('updated_at'), '%Y-%m-%d %H:%M:%S')
        parking_id = data.get('parking')
        parking = ParkingPoint.objects.get(id=parking_id)

        camera_data = CameraData(
            camera=camera,
            all_spaces=all_spaces,
            free_spaces=free_spaces,
            status=status,
            updated_at=updated_at,
            parking=parking
        )
        camera_data.save()

        return render(request, 'serverapp/index.html')
    return render(request, 'serverapp/index.html')



class PointListAPIView(APIView):
    def get(self, request):
        points = Point.objects.all()
        serializer = PointSerializer(points, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PointSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# Get All ParkingPoints
class ParkingPointList(generics.ListAPIView):
    queryset = ParkingPoint.objects.all()
    serializer_class = ParkingPointSerializer


# Get Parking point data by ID
@api_view(['GET'])
def get_point_data(request, parking_point_id):
    try:
        parking_point = ParkingPoint.objects.get(id=parking_point_id)
        latest_camera_data = parking_point.cameradata_set.latest('updated_at')

        serializer = CurrentPointSerializer(latest_camera_data)

        return Response(serializer.data)
    except ParkingPoint.DoesNotExist:
        return Response({'error': 'ParkingPoint not found'}, status=404)
    except CameraData.DoesNotExist:
        return Response({'error': 'CameraData not found'}, status=404)


# Draw Route
class RouteDistanceView(generics.RetrieveAPIView):
    serializer_class = RouteDistanceSerializer

    def get_object(self):
        serializer = RouteSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)

        user_latitude = serializer.validated_data['user_latitude']
        user_longitude = serializer.validated_data['user_longitude']
        point_latitude = serializer.validated_data['point_latitude']
        point_longitude = serializer.validated_data['point_longitude']
        speed = serializer.validated_data['speed']

        user_point = (user_latitude, user_longitude)
        point = (point_latitude, point_longitude)

        # Отримання точок маршруту
        route_points = []
        distance = geodesic(user_point, point)

        num_steps = int(distance.m / 0.1)
        step = 0.1

        for fraction in range(0, num_steps + 1):
            fraction_point = geodesic(user_point, point).destination(point, fraction * step)
            route_points.append((fraction_point.latitude, fraction_point.longitude))

        route_length = distance.m
        route_duration = route_length / speed if speed != 0 else 0

        return {
            'route_length': route_length,
            'route_duration': route_duration,
            'route_points': route_points,
        }

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        response_data = {
            'route_length': instance['route_length'],
            'route_duration': instance['route_duration'],
            'route_points': instance['route_points'],
        }

        return Response(response_data, status=status.HTTP_200_OK)