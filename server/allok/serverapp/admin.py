from django.contrib import admin
from .models import ParkingPoint, CameraData


# parking point register
class ParkingPointAdmin(admin.ModelAdmin):
    pass

class CameraDataAdmin(admin.ModelAdmin):
    pass

admin.site.register(ParkingPoint, ParkingPointAdmin)
admin.site.register(CameraData, CameraDataAdmin)

