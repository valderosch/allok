from .models import ParkingPoint, CameraData
from rest_framework import serializers


# ParkingPoint
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


# Selected Point
class CurrentPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = CameraData
        fields = '__all__'
