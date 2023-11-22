from django.db import models

class Coordenadas(models.Model):
    chofer_id = models.IntegerField(default=0)
    empresa_id = models.IntegerField(default=0)
    latitude = models.DecimalField(max_digits=1000, decimal_places=10)
    longitude = models.DecimalField(max_digits=1000, decimal_places=10)

    def __str__(self) -> str:
        return f"{self.latitude} , {self.longitude}"    # return f"{self.id} : {self.latitude} , {self.longitude}"
