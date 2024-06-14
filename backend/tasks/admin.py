from django.contrib import admin

from tasks.models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title','description','completed')

# Register your models here.
admin.site.register(Task, TaskAdmin)
