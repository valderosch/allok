from rest_framework import serializers
from .models import Point, ParkingPoint


class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = '__all__'


class ParkingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingPoint
        fields = ['id', 'title', 'latitude', 'longitude']