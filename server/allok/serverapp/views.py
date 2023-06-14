import json
from django.shortcuts import render
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Point, CameraData, ParkingPoint
from .seralizers import PointSerializer, ParkingPointSerializer


def index(request):
    return render(request, 'serverapp/index.html')


@csrf_exempt
def save_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        camera = data.get('camera')
        all_spaces = data.get('spaces').get('all')
        free_spaces = data.get('spaces').get('free')
        status = data.get('spaces').get('status')
        updated_at = datetime.strptime(data.get('updated_at'), '%Y-%m-%d %H:%M:%S')

        camera_data = CameraData(
            camera=camera,
            all_spaces=all_spaces,
            free_spaces=free_spaces,
            status=status,
            updated_at=updated_at
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



class ParkingPointList(generics.ListAPIView):
    queryset = ParkingPoint.objects.all()
    serializer_class = ParkingPointSerializer

