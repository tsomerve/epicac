from django.db import models
from django.shortcuts import render, redirect, get_object_or_404
from .models import Poem, Memory


def create_poem(request):
    poems = Poem.objects.all()
    return render(request, '/poetry.html', {'poems': poems})

def create_memory(request, pk):
    memory = get_object_or_404(Poem, pk=pk)
    if request.method == 'POST':
        memory.create_memory = True
        memory.save()
    return redirect('poetry.html', pk=memory.pk)

