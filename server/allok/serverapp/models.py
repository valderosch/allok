from django.contrib.gis.db import models


# parking point model
class ParkingPoint(models.Model):
    title = models.CharField(max_length=30)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.title

    class Meta:
        app_label = 'serverapp'


# data from camera
class CameraData(models.Model):
    camera = models.CharField(max_length=30)
    all_spaces = models.IntegerField()
    free_spaces = models.IntegerField()
    status = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    parking = models.ForeignKey(ParkingPoint, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.camera

    class Meta:
        app_label = 'serverapp'
