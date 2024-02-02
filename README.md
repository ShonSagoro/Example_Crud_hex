# Proyecto de Prueba del Patrón Hexagonal

Este proyecto es un ejemplo sencillo de implementación del patrón hexagonal en una aplicación de Node.js y typescript.

## Descripción

El patrón hexagonal, también conocido como arquitectura de puertos y adaptadores, es un enfoque de diseño de software que busca separar la lógica de negocio de los detalles de implementación y las dependencias externas. Esto permite una mayor flexibilidad, mantenibilidad y testabilidad del código.

En este proyecto, se implementa una aplicación de ejemplo que muestra cómo se pueden organizar las capas del patrón hexagonal:

- **Capa de Dominio**: Contiene las reglas de negocio y la lógica central de la aplicación.
- **Capa de Aplicación**: Actúa como intermediario entre la capa de dominio y las interfaces de entrada y salida.
- **Capa de Infraestructura**: Contiene las implementaciones concretas de las interfaces de entrada y salida, así como las dependencias externas.

<pre>
  ╱|、
(˚ˎ 。7  
 |、˜ 〵          
 じしˍ,)ノ help
</pre>