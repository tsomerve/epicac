import glob
import markovify
import json
from django.db import models
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render

from .models import Poem

def create_poem(request):
    poems = Poem.objects.all()
    return render(request, 'poetry.html', {'poems': poems})

def create_memory(request, pk):
    memory = get_object_or_404(Poem, pk=pk)
    if request.method == 'POST':
        memory.create_memory = True
        memory.save()
    return redirect('poetry.html', pk=memory.pk)

def get_corpuses():
    text = ''
    for text_file in glob.glob('poems/text/*.txt'):
        with open(text_file) as f:
            text += f.read()
    return text

def generate_poem(request):
    sentences = []
    text_model = markovify.Text(get_corpuses())
    while len(sentences) <= 6:
        sentence = text_model.make_short_sentence(50)
        if sentence:
            sentences.append(sentence)
    return JsonResponse({'poem': ' '.join(sentences)})

def save_poem(request):
    json_body = json.loads(request.body)
    poem_text = json_body['poem']
    poem = Poem()
    poem.poetry = poem_text
    poem.save()
    return HttpResponse('')
    
def user_signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('poetry.html')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def detail_poem(request, pk):
    poem = get_object_or_404(Poem, pk=pk)
    return render(request, 'detail.html', {'poem':poem})