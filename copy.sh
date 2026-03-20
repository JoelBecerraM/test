#!/bin/bash

for dir in *.jsp assets
do
	cp -R src/main/webapp/${dir} /opt/apache-tomcat-9.0.65/webapps/ecommerce/
done

#cp -R src/main/resources/* /opt/apache-tomcat-9.0.65/webapps/ecommerce/WEB-INF/classes/

