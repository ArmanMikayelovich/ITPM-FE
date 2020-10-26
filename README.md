# ITPM

## Issue Tracking & Project Management System

IT project management (ITPM) is the process of managing the plan,
 organization, and accountability to achieve information technology goals.
 
  Since the reach of IT spans across most of a business or enterprise,
   the scope of these projects can be large and complex.

The magnitude of IT project management often means that it’s more than just 
applying knowledge, aligning skills, and using regular tools and techniques to drive
 a project to completion.


### How to run.


Make sure you have installed the **[Docker](https://www.docker.com/products/docker-desktop)** in your computer,
 **[commands of this back-end part are running](https://github.com/ArmanMikayelovich/ITPM-BE/blob/master/README.md)** ,and port **3000**  is  not in use.
 ---
 Open cmd/bash, change directory to project folder(where are Dockerfile and package.json) run these commands.

In front end project folder
```shell script
docker build -t react-itpm .
docker docker run  --name itpm-frontend --rm -v :/application -v :/app/node_modules -dp 3000:3000 --link itpm-run:spring-boot-itpm -e CHOKIDAR_USEPOLLING=true react-itpm
 
```