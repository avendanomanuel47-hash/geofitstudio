# Forja — Guía para publicar tu gimnasio en internet

Esto te va a dar una **URL pública real** (algo como `forja-gimnasio.netlify.app`) a la que tus
clientes pueden entrar desde su celular, crear su reserva, y ver sus propios datos —
sin que puedan ver los datos de otros.

Se hace con dos servicios **gratuitos**:
- **Firebase** (de Google) → guarda los datos y maneja los inicios de sesión reales.
- **Netlify** → publica la página con una URL pública.

No necesitas tarjeta de crédito para ninguno de los dos en este uso.

---

## Parte 1 — Crear el proyecto en Firebase

1. Entra a **console.firebase.google.com** con tu cuenta de Google.
2. Haz clic en **"Crear proyecto"**. Ponle un nombre, por ejemplo `forja-gimnasio`. Puedes
   desactivar Google Analytics (no lo necesitas). Espera a que se cree.
3. En el menú izquierdo, entra a **Compilación → Authentication**. Haz clic en **"Comenzar"**.
   En la lista de proveedores, elige **"Correo electrónico/contraseña"** y actívalo. Guardar.
4. En el menú izquierdo, entra a **Compilación → Firestore Database**. Haz clic en **"Crear
   base de datos"**. Elige **"Modo de producción"** y la región más cercana a ti (por ejemplo
   una de EE.UU. o `southamerica-east1`). Crear.
5. Dentro de Firestore, ve a la pestaña **"Reglas"**. Vas a ver un editor de texto.
   Borra todo su contenido y pega exactamente el contenido del archivo **`firestore.rules`**
   que te entregué. Haz clic en **"Publicar"**.
6. Ve a **Configuración del proyecto** (el ícono de engranaje, arriba a la izquierda) →
   pestaña **"General"** → baja hasta **"Tus apps"** → haz clic en el ícono **`</>`** (Web).
   Ponle un apodo, por ejemplo `forja-web`, y haz clic en **"Registrar app"**.
   Firebase te va a mostrar un bloque de código con un objeto `firebaseConfig = { ... }`.
   **Copia ese bloque completo.**

---

## Parte 2 — Conectar el código con tu proyecto

1. Abre el archivo **`index.html`** que te entregué, con cualquier editor de texto
   (Bloc de notas sirve, o Notepad++, o VS Code).
2. Busca esta sección cerca del inicio del `<script>`:
   ```
   const firebaseConfig = {
     apiKey: "PEGA_AQUI_TU_API_KEY",
     ...
   };
   ```
3. Reemplázala completa por el bloque que copiaste de Firebase en el paso anterior.
4. Guarda el archivo.

---

## Parte 3 — Crear la cuenta del primer administrador

1. En Firebase, ve a **Authentication → pestaña "Users"** → **"Agregar usuario"**.
2. Escribe un **correo real** (el tuyo, por ejemplo) y una contraseña de al menos 6 caracteres.
   Este será el primer administrador. Haz clic en **"Agregar usuario"**.

(El segundo administrador y todos los clientes se crean después, desde dentro de la
aplicación — ya no hace falta volver a esta pantalla de Firebase.)

---

## Parte 4 — Publicar la página con URL pública

1. Entra a **app.netlify.com/drop** en tu navegador (no hace falta cuenta para probar,
   pero te recomiendo crear una gratis con tu correo de Google para que el sitio no se borre).
2. Verás un recuadro que dice **"Arrastra tu carpeta aquí"**.
3. Arrastra la carpeta completa `forja-web` (la que contiene tu `index.html` ya editado)
   sobre ese recuadro.
4. En unos segundos, Netlify te dará una **URL pública**, por ejemplo:
   `https://algo-al-azar-123.netlify.app`
5. Esa es la dirección que vas a compartir con tus clientes y el otro administrador.
   Puedes cambiar el nombre del sitio (para que sea más fácil de recordar) desde
   **"Site settings" → "Change site name"** en Netlify.

---

## Parte 5 — Primer ingreso

1. Abre la URL pública que te dio Netlify.
2. Inicia sesión con el **correo y contraseña** del administrador que creaste en la Parte 3.
3. Verás una pantalla de **"Configuración inicial"**: escribe tu nombre y confirma.
   Con eso quedas registrado como el primer administrador dentro de la app.
4. Desde el panel, ve a la pestaña **"Administradores"** para crear al segundo administrador
   (con su propio correo y contraseña), y a la pestaña **"Clientes"** para dar de alta a tus
   clientes (cada uno con un nombre de usuario y una contraseña inicial que tú les des).
5. Comparte con cada cliente: la URL pública + su nombre de usuario + su contraseña.
   Ellos entrarán, verán sus datos, y podrán reservar su clase directamente.

---

## Notas importantes

- **Si un cliente olvida su contraseña**: como no usa un correo real, no se le puede
  enviar un correo de recuperación. Tú (administrador) debes ir a Firebase →
  Authentication → buscar su cuenta → eliminarla, y luego volver a crear al cliente
  desde la app con una nueva contraseña.
- **Si un administrador olvida su contraseña**: como sí usó un correo real, puede
  usar "¿Olvidaste tu contraseña?" — esta función no está en la app todavía, pero
  se puede agregar fácilmente; mientras tanto, puedes restablecerla manualmente
  desde Firebase → Authentication.
- **Capacidad por horario**: está fija en 5 personas por clase (se puede ajustar
  cambiando el número `CAPACIDAD` cerca del inicio del archivo `index.html`).
- **Cada vez que cambies el archivo `index.html`**, necesitas volver a subirlo a
  GitHub para actualizar la página publicada.
- Todo esto corre dentro de la capa **gratuita** de Firebase y GitHub Pages, que es
  más que suficiente para 2 administradores y 40 clientes.

---

## Parte 6 — Instalarla como app (Android y iPhone)

Ya viene lista para instalarse como una app real, con el ícono de Geofit Studio.
Sube TODA la carpeta a GitHub (`index.html`, `manifest.json`, `sw.js`, `version.json`, y la carpeta
`icons` completa con sus 5 imágenes) — todos esos archivos deben quedar en el mismo
nivel, junto al `index.html`.

**En Android (Chrome):**
1. Abre la URL pública de la app.
2. Aparecerá un banner o un aviso en el menú (⋮) que dice **"Instalar app"** o
   **"Agregar a pantalla de inicio"**. Tócalo.
3. Confirma. Va a aparecer un ícono de Geofit Studio junto a las demás apps, y al
   abrirlo se ve sin la barra de direcciones del navegador, como una app normal.

**En iPhone (Safari — tiene que ser Safari, no Chrome):**
1. Abre la URL pública de la app en Safari.
2. Toca el ícono de **compartir** (el cuadrado con la flecha hacia arriba).
3. Baja y toca **"Agregar a pantalla de inicio"**.
4. Confirma el nombre ("Geofit") y toca **"Agregar"**.
5. Va a quedar el ícono de Geofit Studio en su pantalla de inicio.

Comparte estos dos mini-instructivos con tus clientes junto con su usuario y
contraseña — así todos la usan como una app, sin tener que recordar la URL ni
buscarla en el navegador cada vez.


---

## Parte 7 — Publicar una nueva versión (identificador de versión)

La app muestra al final de cada pantalla **"Versión X.Y.Z"** y un botón **"Buscar actualización"**.
Además, revisa sola al abrirse, al volver a ella y cada 10 minutos. Si hay una versión más
nueva aparece un aviso **"Nueva versión disponible → Actualizar"**; al tocarlo limpia la
copia guardada y recarga, sin que el cliente borre nada a mano.

**Cada vez que publiques cambios:**
1. En `index.html` cambia `const APP_VERSION = "1.2.0";` por el número nuevo (ej. `1.3.0`).
2. En `version.json` pon el MISMO número: `{ "version": "1.3.0" }`.
3. Sube a GitHub `index.html` y `version.json` (y `sw.js` solo si cambió).

El aviso solo aparece si el número de `version.json` es **mayor** que el de la app instalada.
Nota: la primera vez que publiques esta versión (1.2.0), los celulares que ya tenían la app
necesitan una actualización manual (abrir la página y refrescar); desde ahí, las siguientes
llegan solas con el aviso.
