FROM mysql:8.0

ENV MYSQL_DATABASE ctims
ENV MYSQL_USER ctims
ENV MYSQL_PASSWORD ctims
ENV MYSQL_ROOT_PASSWORD ctims

EXPOSE 3306

COPY my.cnf /etc/mysql/conf.d/

CMD ["mysqld"]
