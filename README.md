THE CHASE
==============
  - policia_e_ladrao


This is built with SaSeed PHP Framework. In order for you to start
working with it, you'll need to set up a few simples things.

1 - Define your environment at: /SaSeed/Settings.php
        
        define('ENV', 'DEV');
        
        LIVE = online, for the world to see.
        DEV = development environment.
        (you'll use 'DEV' for this and never upload this file =D )
        
2 - Still at Settings.php, define yoururl path
        Example: As I'm using xampp, my game is at /htdocs/policiaELadrao,
        so my url path is set as the following:
          
          define('URL_PATH',	'/policiaELadrao');
          
          (it means this => http://localhost/policiaELadrao)


3 - Create a MySql database with the following tables:

        CREATE TABLE IF NOT EXISTS `tb_gamelog` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `id_user` int(11) NOT NULL,
          `int_points` int(11) NOT NULL,
          `dt_log` datetime NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


        CREATE TABLE IF NOT EXISTS `tb_ranking` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `id_user` int(11) NOT NULL,
          `int_points` int(11) NOT NULL,
          `dt_log` datetime NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

        CREATE TABLE IF NOT EXISTS `tb_user` (
          `id` int(11) NOT NULL AUTO_INCREMENT,
          `str_nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
          `str_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
          `int_max_points` int(11) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

4 - Set the database name and connection settings at: /SaSeed/Config/database.in
        (Attention to the environment ;) )


Well, I guess this is pretty much it.

Feel free to ask any questions


Vinas
vinas.andrade@gmail.com
http://www.facebook.com/vinas.andrade


- Cheers! =D

