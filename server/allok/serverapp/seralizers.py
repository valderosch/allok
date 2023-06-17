from rest_framework import serializers
from .models import Point, ParkingPoint, CameraData
from django.contrib.gis import geos
from django.contrib.gis.measure import Distance
from rest_framework import serializers, generics


class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = '__all__'


class ParkingPointSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        try:
            camera_data = obj.cameradata_set.latest('updated_at')
            return camera_data.status
        except CameraData.DoesNotExist:
            return None

    class Meta:
        model = ParkingPoint
        fields = ['id', 'title', 'latitude', 'longitude', 'status']

class CurrentPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = CameraData
        fields = '__all__'

# ROUTING

class RouteSerializer(serializers.Serializer):
    user_latitude = serializers.FloatField()
    user_longitude = serializers.FloatField()
    point_latitude = serializers.FloatField()
    point_longitude = serializers.FloatField()
    speed = serializers.FloatField()


class RouteDistanceSerializer(serializers.Serializer):
    route_length = serializers.FloatField()





