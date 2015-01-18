#NJSLinuxBot

AI bot made for Final Degree Project of Ángel González based on Hollywell's Google Talk Bot, Hubot GTalk adapter and ALICE.
Bot de inteligencia artificial para el Proyecto de Fin de Grado de Ángel González basado en el bot de Google Talk de Hollywell, el adaptador GTalk de Hubot y en ALICE.

##Instalación

**ADVERTENCIA:**Debido a las depedencias usadas, solo se garantiza su funcionamiento en GNU/Linux. En Windows se ha realizado pruebas de funcionamiento sin éxito y en otros sistemas no se sabe si dará el resultado esperado. Con el tiempo es posible que esto cambie.

###Linux
*Es necesario tener instalado NodeJS, Git y NPM. Para su instalación, consulte los manuales disponibles en las webs de los programas.*

Para instalar esta aplicación, procedemos a la descarga del código mediante Git o en el enlace de descarga de Github:

  git clone https://github.com/Aglezabad/NJSLinuxBot.git

Posteriormente, instalamos las depedencias necesarias:

  npm install

Por último, podemnos modificar los parámetros por defecto del fichero config.json para ejecutar el bot en otra cuenta de Google e introducir otros datos para otros servicios. Tras ello, procedemos a la ejecución de la aplicación desde la ruta de la misma.

  PASSWORD="[password]" npm start

  PASSWORD="[password]" nodejs --harmony njsbot.js

Para conversar con el bot, basta con abrir GTalk (Hangouts) y agregar la cuenta del bot, como si se tratase de un usuario común.

##Fallos y errores detectados.
La aplicación no tiene un funcionamiento correcto debido a la dependencia aimlinterpreter y a mi propia implementación, que descubrí tarde que no era la más apropiada, causante de los siguientes problemas:

* Por la dependencia domjs, los ficheros AIML no pueden contener etiquetas que no cumplan con XML, como el salto de línea de HTML (aceptado en la implementación AIML 2.0). 

* Por su implementación propia, parece que no hay prioridad en los patrones, pudiendo responder el bot con el último recurso (Frases default) e incluso no responder al patrón recibido.

* No reconoce el 80% de las etiquetas implementadas en AIML2.0, por lo que no se puede ejecutar ALICE2.0 con esta aplicación.

* También, por su implementación, puede ser el causante de un abuso de memoria en la búsqueda de la respuesta a dar, causando una excepción "Maximum call stack" en NodeJS.

* Por fallos de implementación propios, el bot podría confundir temas cuando conversa con varios usuarios de forma simultánea.

Todo ello será solventado con el desarrollo de un intérprete para NodeJS denominado ProgramJS, basado en ProgramAB creado por el Dr. Wallace. También se solventarán los problemas de implementación, realizando desde cero un nuevo cliente, que está disponible en la rama "new-client".


##Licencia
Esta aplicación está licenciada bajo la GPLv3. El texto de la misma se encuentra disponible en el fichero LICENSE.txt.