# coding: utf-8
from setuptools import setup, find_packages

setup(name='django-admin-tools',
      version='0.7',
      description='A collection of tools for the django administration interface',
      url='https://github.com/buremba/django_admin_tools',
      author='Burak Emre Kabakcı',
      long_description=open('README.rst').read(),
      author_email='emrekabakci@gmail.com',
      license='MIT',
      packages=find_packages(),
      zip_safe=False,
      include_package_data=True,
      install_requires=[
          'django>=1.5,<1.7'
      ]
)
