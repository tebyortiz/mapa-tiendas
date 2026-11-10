# Búsqueda de productos y asistente

## El asistente de compra es un buscador, no un chatbot
- El robot flotante busca productos de Gesto y TTV cerca del usuario (`POST /api/geo/search`). No conversa: sus respuestas son plantillas nuestras según el resultado.
- Flujo: input → spinner → si hay resultados, va al mapa en "modo producto" (un pin por tienda con la imagen del producto y una ficha con la tienda y sus productos con precio). Un banner con la búsqueda y una X permite salir.
- No lleva panel de chat: solo la burbuja del lanzador.
- Hoy está oculto. El chatbot real ("buscar de todo") vendrá después y podrá reutilizar el lanzador y el store.

## Un solo buscador
- Hero, navbar, drawer mobile y asistente buscan igual y muestran el mismo resultado en el mapa.
