from django.db import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    e_mail = models.CharField(db_column='e-mail', primary_key=True, max_length=255)  # Field renamed to remove unsuitable characters.
    password = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    administrator = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'User'

class Chapters(models.Model):
    id = models.AutoField(primary_key=True)
    mangaid = models.ForeignKey('Manga', models.DO_NOTHING, db_column='mangaid')
    chapter_path = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'chapters'


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    mangaid = models.ForeignKey('Manga', models.DO_NOTHING, db_column='mangaid')
    user_email = models.ForeignKey(User, models.DO_NOTHING, db_column='user_email')  # Field name made lowercase. Field renamed to remove unsuitable characters.
    data = models.CharField(max_length=255, blank=True, null=False)
    class Meta:
        managed = False
        db_table = 'comment'


class Manga(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    chapter_amount = models.IntegerField(blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    tags = ArrayField(
        models.CharField(max_length=100, blank=True),  # Adjust the length according to the enum size
        blank=True,
        null=True,
        default=list
    )

    class Meta:
        managed = False
        db_table = 'manga'


class Photo(models.Model):
    id_integer = models.AutoField(db_column='id integer', primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    file_path = models.CharField(max_length=255, blank=True, null=True)
    mangaid = models.ForeignKey(Manga, models.DO_NOTHING, db_column='mangaid')

    class Meta:
        managed = False
        db_table = 'photo'


class Rating(models.Model):
    number = models.IntegerField(blank=True, null=True)
    mangaid = models.ForeignKey(Manga, models.DO_NOTHING, db_column='mangaid')
    usere_mail = models.ForeignKey(User, models.DO_NOTHING, db_column='Usere-mail')  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'rating'


class UserManga(models.Model):
    usere_mail = models.OneToOneField(User, models.DO_NOTHING, db_column='Usere-mail', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. The composite primary key (Usere-mail, mangaid) found, that is not supported. The first column is selected.
    mangaid = models.ForeignKey(Manga, models.DO_NOTHING, db_column='mangaid')

    class Meta:
        managed = False
        db_table = 'user_manga'
        unique_together = (('usere_mail', 'mangaid'),)