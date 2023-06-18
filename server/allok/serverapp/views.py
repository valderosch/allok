import json
from math import sin, cos, sqrt, atan2, radians

from django.http import JsonResponse
from django.shortcuts import render
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
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

    elif request.method == 'PUT':
        data = json.loads(request.body)
        camera_data_id = data.get('id')
        try:
            camera_data = CameraData.objects.get(id=camera_data_id)
            camera_data.camera = data.get('camera')
            camera_data.all_spaces = data.get('spaces').get('all')
            camera_data.free_spaces = data.get('spaces').get('free')
            camera_data.status = data.get('spaces').get('status')
            camera_data.updated_at = datetime.strptime(data.get('updated_at'), '%Y-%m-%d %H:%M:%S')
            camera_data.parking_id = data.get('parking')
            camera_data.save()
            return JsonResponse({'message': 'Camera data updated successfully.'})
        except CameraData.DoesNotExist:
            return JsonResponse({'message': 'Camera data does not exist.'}, status=404)

    elif request.method == 'DELETE':
        data = json.loads(request.body)
        camera_data_id = data.get('id')
        try:
            camera_data = CameraData.objects.get(id=camera_data_id)
            camera_data.delete()

            return JsonResponse({'message': 'Camera data deleted successfully.'})
        except CameraData.DoesNotExist:
            return JsonResponse({'message': 'Camera data does not exist.'}, status=404)

    return render(request, 'serverapp/index.html')


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

# find nearest point
@api_view(['GET'])
@permission_classes([AllowAny])
def nearest_parking_point(request):
    latitude = float(request.query_params.get('latitude', 0))
    longitude = float(request.query_params.get('longitude', 0))
    search_distance = float(request.query_params.get('search_distance', 0))

    def calculate_distance(latitude1, longitude1, latitude2, longitude2):
        # Радіус Землі в метрах
        earth_radius = 6371 * 1000

        # Перетворення координат в радіани
        lat1, lon1, lat2, lon2 = map(radians, [latitude1, longitude1, latitude2, longitude2])

        # Різниця між координатами
        dlon = lon2 - lon1
        dlat = lat2 - lat1

        # Формула гаверсинусів
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        # Відстань між точками
        distance = earth_radius * c

        return distance

    def find_nearest_parking(latitude, longitude, search_distance):
        parking_points = ParkingPoint.objects.all()
        nearest_parking = None
        min_distance = float('inf')

        for parking_point in parking_points:
            distance = calculate_distance(latitude, longitude, parking_point.latitude, parking_point.longitude)
            if distance < min_distance and distance <= search_distance:
                min_distance = distance
                nearest_parking = parking_point

        return nearest_parking

    nearest_parking = find_nearest_parking(latitude, longitude, search_distance)

    if nearest_parking:
        serializer = ParkingPointSerializer(nearest_parking)
        return Response(serializer.data)
    else:
        return Response(status=404)
