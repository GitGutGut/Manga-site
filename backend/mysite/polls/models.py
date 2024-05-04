from django.db import models


class Tag(models.Model):
    name = models.CharField(primary_key=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'Tag'


class User(models.Model):
    e_mail = models.CharField(db_column='e-mail', primary_key=True, max_length=255)  # Field renamed to remove unsuitable characters.
    password = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'User'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


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
    usere_mail = models.ForeignKey(User, models.DO_NOTHING, db_column='Usere-mail')  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Manga(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    chapter_amount = models.IntegerField(blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'manga'


class MangaTag(models.Model):
    mangaid = models.OneToOneField(Manga, models.DO_NOTHING, db_column='mangaid', primary_key=True)  # The composite primary key (mangaid, tagname) found, that is not supported. The first column is selected.
    tagname = models.ForeignKey(Tag, models.DO_NOTHING, db_column='tagname')

    class Meta:
        managed = False
        db_table = 'manga_tag'
        unique_together = (('mangaid', 'tagname'),)


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
