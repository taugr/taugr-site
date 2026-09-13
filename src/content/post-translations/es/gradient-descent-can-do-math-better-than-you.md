---
title: 'El descenso de gradiente puede hacer matemáticas mejor que tú'
description: 'Los avances matemáticos de la IA están abriendo nuevas puertas a la investigación. La disciplina tiene más que ganar que temer.'
date: 2026-09-14
tags: ['IA', 'matemáticas', 'investigación']
translationOf: gradient-descent-can-do-math-better-than-you
locale: es
draft: false
editorial: true
image: '../../../assets/essays/gradient-descent.png'
imageAlt: 'Un remolino de tinta verde se transforma en finas curvas geométricas y una malla matemática sobre papel de color marfil.'
---

Si has seguido las noticias sobre IA últimamente, habrás visto el anuncio de OpenAI sobre lo que afirma que es una solución al problema de existencia y regularidad de Navier–Stokes, uno de los Problemas del Milenio. Estas ecuaciones describen cómo se mueven los fluidos, pero desde hace mucho tiempo sigue abierta la cuestión de si sus soluciones pueden perder la regularidad incluso cuando el movimiento comienza de forma suave. OpenAI afirma que su modelo —uno interno, que no se ha puesto a disposición del público— ha construido un caso en el que esto ocurre bajo una fuerza externa suave, y ha publicado tanto un argumento escrito como una formalización en Lean. [\[1\]](https://openai.com/index/navier-stokes-solution/)

El anuncio ha suscitado un amplio debate sobre el impacto de la IA en la investigación matemática. Una declaración firmada por 25 medallistas Fields sostiene que la búsqueda de avances matemáticos mediante pruebas de evaluación de IA se está desvinculando del propósito de las matemáticas. Como dice la carta, «resolver problemas es solo una herramienta y un indicador indirecto para alcanzar el objetivo principal de la comprensión conceptual y la profundización en las ideas». También plantea preocupaciones sobre la atribución del trabajo, la publicación apresurada y la formación de futuros investigadores. [\[2\]](https://mathandai.org/)

Estoy de acuerdo con buena parte de lo que se dice aquí. Las matemáticas tratan de comprender las estructuras y relaciones que hacen que un resultado sea verdadero, y una demostración es valiosa en parte por las ideas que introduce a lo largo del camino. Sin embargo, no veo la creciente capacidad de la IA para producir estos resultados como una amenaza para las matemáticas. Si puede descubrir cosas que antes estaban fuera de nuestro alcance, tenemos una oportunidad de profundizar en nuestra comprensión. Eso incluye encontrar nuevas líneas de investigación, aprovechar mejor los trabajos existentes y utilizar la propia IA para ayudar a explicar lo que descubrimos.

## Lo que revela una demostración

Pensemos en qué hace interesante la lectura de una demostración matemática. Puede que conozcamos la conclusión antes de empezar, pero su belleza suele estar en los giros del razonamiento y en la forma en que convergen ideas aparentemente inconexas. Seguir los argumentos desde los principios fundamentales hasta la conclusión nos permite comprender por qué el teorema es verdadero. Por eso, una demostración distinta del mismo teorema puede ser valiosa y aportar nuevas ideas, incluso cuando el resultado ya está establecido.

La declaración expresa la preocupación de que producir respuestas con rapidez pueda perjudicar áreas de investigación fértiles. [\[2\]](https://mathandai.org/) Las empresas con grandes presupuestos y objetivos que superar en las pruebas de evaluación podrían resolver problemas en torno a los cuales los investigadores han construido su trabajo. No creo que esto equivalga a arrasar un área de investigación. Resolver una conjetura no agota necesariamente las matemáticas que la rodean, y los métodos empleados pueden crear nuevas oportunidades.

La demostración de Andrew Wiles del último teorema de Fermat ilustra esta idea. Su importancia fue mucho más allá de resolver una conjetura célebre. Apoyándose en trabajos anteriores, Wiles demostró un caso crucial de una conexión propuesta entre las curvas elípticas y las formas modulares. Sus métodos, desarrollados junto con Richard Taylor, permitieron nuevos avances, incluida la posterior demostración del teorema de modularidad completo. [\[7\]](https://abelprize.no/sites/default/files/2021-04/citation_en_2016_A.Wiles_.pdf) Resolver el último teorema de Fermat abrió nuevas vías de investigación gracias a las ideas que hicieron posible su solución.

<blockquote class="pull-quote">
  <p><em>«Resolver una conjetura no agota necesariamente las matemáticas que la rodean, y los métodos empleados pueden crear nuevas oportunidades».</em></p>
</blockquote>

Una demostración producida por IA no tiene por qué introducir ideas de una potencia comparable. Pero tampoco deberíamos dar por hecho que una solución automatizada no deja nada que merezca investigarse. Podemos estudiar sus resultados intermedios, preguntarnos dónde son aplicables sus métodos y buscar una explicación más clara. Su valor para la investigación depende de lo que podamos aprender de la demostración, aunque la empresa que la produjo estuviera interesada principalmente en una prueba de evaluación.

## Encontrar problemas que merezcan la pena

Supongamos que una IA encuentra un contraejemplo a una conjetura que parecía intuitivamente correcta. Investigar las condiciones en las que funciona ese contraejemplo podría poner de manifiesto una hipótesis que falta, sugerir una conjetura revisada o revelar una conexión con otro problema. La IA puede orientar a los investigadores hacia estas preguntas, incluso en áreas que han recibido poca atención.

Los problemas famosos pueden inspirar trabajos valiosos, como muestra el ejemplo de Wiles. Sin embargo, su reputación también atrae a los investigadores hacia los mismos objetivos, y sospecho que esto explica una considerable duplicación de esfuerzos. La fama por sí sola no determina el valor de un problema para la investigación. La IA puede ayudarnos a explorar con mayor amplitud y a identificar preguntas que merezcan la pena antes de que adquieran esa reputación.

<blockquote class="pull-quote">
  <p><em>«La fama por sí sola no determina el valor de un problema para la investigación».</em></p>
</blockquote>

También podría ayudar a evitar que se duplique un trabajo ya realizado. Recuerdo que uno de mis supervisores académicos en matemáticas expresó cierta frustración al descubrir que varios teoremas que había desarrollado y creía novedosos ya los había demostrado Dedekind más de un siglo antes. Redescubrir algo puede ser instructivo, pero conocer antes el trabajo original le habría permitido avanzar a partir de él. Buscar entre distintas disciplinas, notaciones desconocidas y generaciones de publicaciones es una tarea considerable.

Ya hay indicios de que la IA puede ayudar. En un estudio de 700 problemas abiertos de una base de datos de problemas de Erdős, unos investigadores que utilizaban Gemini identificaron en la bibliografía soluciones ya existentes para ocho de ellos. Los autores también destacaron el riesgo de que la IA reproduzca trabajos anteriores sin reconocerlos. [\[3\]](https://arxiv.org/abs/2601.22401) Sus hallazgos requieren comprobación, pero relacionar un problema con un resultado que ha pasado inadvertido puede ahorrar tiempo y facilitar el intercambio de ideas entre distintas áreas de las matemáticas.

## Explicar las matemáticas

Encontrar y comprobar un resultado es solo una parte del proceso. Los sistemas de demostración formal como Lean establecen que una conclusión formulada formalmente se deduce de sus definiciones e hipótesis, lo que nos permite comprobar un argumento sin depender de la IA que lo produjo. Aun así, debemos asegurarnos de que el enunciado formal representa el problema que queremos resolver, ya que la demostración resultante puede ser difícil de seguir para una persona. La verificación nos proporciona una base más sólida para investigar el resultado, pero no ofrece automáticamente una explicación útil. [\[4\]](https://lean-lang.org/theorem_proving_in_lean4/Introduction/)

Pero ¿por qué debería detenerse ahí la contribución de la IA? No veo ninguna razón de fondo por la que no pueda ayudar también a explicar las matemáticas de formas que los seres humanos podamos entender. Ante una demostración larga, podríamos pedirle que identifique dónde se utiliza una hipótesis concreta y que examine qué ocurre si se elimina. Podría construir ejemplos que faciliten la comprensión de una definición poco familiar o explorar un argumento más sencillo. Sus propuestas necesitarían un examen riguroso, pero estas son formas concretas de desarrollar la comprensión, y producir una explicación útil es en sí mismo un objetivo que merece la pena para la investigación en IA.

Ya tenemos ejemplos de esta capacidad. En julio de 2025, una versión avanzada de Gemini Deep Think alcanzó el nivel de medalla de oro en la Olimpiada Internacional de Matemáticas, resolviendo cinco de sus seis problemas. Sus demostraciones estaban escritas en lenguaje natural, y el presidente de la olimpiada, Gregor Dolinar, señaló que los correctores las habían encontrado «claras, precisas y, en su mayoría, fáciles de seguir». [\[5\]](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/) Apenas algo más de un año separa ese hito de la demostración de Navier–Stokes de OpenAI. Las matemáticas de competición y la investigación de vanguardia tienen exigencias distintas, pero el ritmo de los avances nos da pocos motivos para considerar permanentes las limitaciones actuales. Espero que la capacidad de la IA para explicar matemáticas difíciles mejore más rápido de lo que mucha gente prevé.

## El papel de las universidades

Aunque la IA lleve a cabo gran parte de los descubrimientos y llegue a explicar los resultados de manera excelente, las universidades seguirán teniendo un papel esencial. Entre sus fines está ayudar a las personas a comprender ideas, aplicarlas y formular sus propias preguntas. Seguimos enseñando teoremas mucho después de que se conozcan sus demostraciones porque cada estudiante aún tiene que llegar a comprender el argumento por sí mismo. Una buena explicación le ayuda a hacerlo; no elimina la necesidad de aprender el teorema.

Hay una cita en la que pienso a menudo y que recoge esta distinción: «_puedes delegar tu pensamiento, pero no puedes delegar tu comprensión_». [\[6\]](https://x.com/karpathy/status/2049907410303865030) La IA puede llevar a cabo partes del razonamiento y explicar lo que ha hecho, pero tener acceso a una respuesta no significa que la comprendamos. Esto es igual de cierto cuando la respuesta viene de otra persona. Aún tenemos que seguir el argumento, cuestionarlo y establecer las conexiones por nosotros mismos.

<blockquote class="pull-quote">
  <p><em>«Puedes delegar tu pensamiento, pero no puedes delegar tu comprensión».</em> <a href="https://x.com/karpathy/status/2049907410303865030">[6]</a></p>
</blockquote>

La preocupación por cómo se sostendrá la investigación matemática merece atención. La propia declaración reconoce que la IA podría mejorar la comprensión matemática. [\[2\]](https://mathandai.org/) Si las empresas se centran en anunciar resultados y dejan su explicación en manos de una comunidad académica ya sobrecargada, puede quedar trabajo útil sin hacer. Los estudiantes también necesitan oportunidades para desarrollar su propio razonamiento. Las universidades, las organizaciones educativas y las empresas de IA deberían prestar más atención a la explicación y a la enseñanza, y desarrollar herramientas que apoyen ambas.

Veo la IA como una herramienta más para explorar las matemáticas. Puede revelar resultados sorprendentes y conexiones que han pasado inadvertidas, al tiempo que crea oportunidades para profundizar en la comprensión y mejorar la enseñanza de las matemáticas. Estos aspectos son centrales para la disciplina, y la IA nos ofrece más formas de cultivarlos.

<aside class="article-endnote" aria-labelledby="title-note-label">
  <p><strong id="title-note-label">Nota sobre el título:</strong> Karpathy predijo en 2017: «El descenso de gradiente puede escribir código mejor que tú. Lo siento». <a href="https://twitter.com/karpathy/status/893576281375219712">[8]</a> La profecía análoga para las matemáticas está empezando a cumplirse.</p>
</aside>

## Referencias

[\[1\] OpenAI — Sobre el Problema del Milenio de Navier–Stokes.](https://openai.com/index/navier-stokes-solution/)

[\[2\] Math and AI — Un grave desajuste de la IA en las matemáticas.](https://mathandai.org/)

[\[3\] Feng y otros — Descubrimiento matemático semiautónomo con Gemini: un estudio de caso sobre los problemas de Erdős.](https://arxiv.org/abs/2601.22401)

[\[4\] Demostración de teoremas en Lean 4 — Introducción.](https://lean-lang.org/theorem_proving_in_lean4/Introduction/)

[\[5\] Google DeepMind — Gemini Deep Think alcanza el nivel de medalla de oro en la Olimpiada Internacional de Matemáticas.](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)

[\[6\] Andrej Karpathy — Publicación que atribuye la cita a @yacineMTB.](https://x.com/karpathy/status/2049907410303865030)

[\[7\] Premio Abel — Andrew Wiles: justificación del premio de 2016.](https://abelprize.no/sites/default/files/2021-04/citation_en_2016_A.Wiles_.pdf)

[\[8\] Andrej Karpathy — «El descenso de gradiente puede escribir código mejor que tú».](https://twitter.com/karpathy/status/893576281375219712)
