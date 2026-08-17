# 10 · Legal & Tratamiento de Datos (borradores)

> ⚠️ **Importante:** estos son **borradores de referencia** para acelerar el trabajo.
> **Deben ser revisados y aprobados por el área legal de A1S** antes de publicar. No
> constituyen asesoría jurídica. Marco aplicable: **Colombia — Ley 1581 de 2012
> (Habeas Data)**, Decreto 1377 de 2013 y normas concordantes.

---

## 1. Qué debe incluir el sitio

| Elemento | Dónde |
|---|---|
| **Política de Tratamiento de Datos Personales** | `/politica-de-tratamiento-de-datos` |
| **Aviso de Privacidad** | `/aviso-de-privacidad` |
| **Política de Cookies** | `/politica-de-cookies` |
| **Términos y Condiciones** | `/terminos-y-condiciones` |
| **Casilla de consentimiento** | en cada formulario (contacto y postulación) |
| **Banner de cookies/consentimiento** | global; controla activación de GA4 |

---

## 2. Casilla de consentimiento (texto borrador)

> ☐ Autorizo a **A1S — A 1 Security Group** el tratamiento de mis datos personales
> conforme a su [Política de Tratamiento de Datos](/politica-de-tratamiento-de-datos),
> con la finalidad de [atender mi solicitud / gestionar mi postulación] y ser
> contactado(a) por estos medios. Conozco que puedo ejercer mis derechos a conocer,
> actualizar, rectificar y suprimir mis datos.

- Debe ser **obligatoria** (no preseleccionada) para enviar el formulario.
- Registrar **timestamp + versión** de la política aceptada.

---

## 3. Política de Tratamiento de Datos (estructura + borrador base)

**Responsable:** A1S — A 1 Security Group `[razón social y NIT]`, domicilio `[dirección]`,
correo `[correo de protección de datos]`, tel. +57 305 771 0909.

**Secciones mínimas:**
1. **Finalidades del tratamiento** — atención de solicitudes comerciales; gestión de
   procesos de selección y vinculación; envío de información y comunicaciones;
   cumplimiento de obligaciones legales y contractuales.
2. **Datos recolectados** — identificación y contacto; en postulaciones, datos de hoja
   de vida (formación, experiencia) y los necesarios para el proceso de selección.
3. **Derechos del titular** (Ley 1581/2012) — conocer, actualizar, rectificar y
   suprimir; revocar la autorización; solicitar prueba de la autorización; presentar
   quejas ante la SIC.
4. **Canales para ejercer derechos** — correo `[correo]`, teléfono, dirección física;
   plazos de respuesta legales.
5. **Datos sensibles y de menores** — tratamiento conforme a la ley; no obligatoriedad
   de responder por datos sensibles.
6. **Transferencias/transmisiones** — a encargados (ej. proveedores tecnológicos) bajo
   acuerdos de confidencialidad.
7. **Seguridad de la información** — medidas técnicas y administrativas.
8. **Vigencia** de la política y de las bases de datos; **fecha de actualización**.

> Borrador de cláusula de finalidad (postulación): *"Los datos suministrados serán
> tratados con la finalidad de adelantar el proceso de selección, verificar la
> información, contactar al candidato y, en caso de vinculación, gestionar la relación
> laboral. La hoja de vida podrá conservarse en banco de datos por [tiempo] para futuras
> oportunidades, salvo solicitud de supresión."* `[validar tiempos de retención]`

---

## 4. Aviso de Privacidad (resumen breve, borrador)
> A1S — A 1 Security Group informa que los datos personales recolectados a través de
> este sitio serán tratados de forma segura y confidencial con las finalidades
> descritas en nuestra Política de Tratamiento de Datos. Usted puede conocer,
> actualizar, rectificar y suprimir sus datos, así como revocar la autorización,
> escribiendo a `[correo]`.

---

## 5. Cookies / Consentimiento
- **Banner** al primer ingreso: aceptar / rechazar / preferencias.
- **GA4 y trackers no esenciales NO cargan** hasta aceptación.
- Distinguir cookies esenciales (funcionamiento) de analíticas/marketing.
- Enlace a Política de Cookies con detalle y forma de revocar.

---

## 6. Manejo de hojas de vida (recomendación de cumplimiento)
- **Minimizar almacenamiento**: preferir notificación a RRHH + archivo en storage
  privado con acceso restringido y enlaces temporales.
- Definir **tiempo de retención** y proceso de **borrado**.
- Acceso solo a personal autorizado de RRHH.
- Registro de la autorización (consentimiento) asociado a cada postulación.

---

## 7. Pendientes para legal (checklist)
- [ ] Razón social, NIT, dirección y correo oficial de protección de datos.
- [ ] Tiempos de retención de hojas de vida y bases de datos.
- [ ] Aprobación de textos de política, aviso, cookies y términos.
- [ ] Registro de bases de datos ante la SIC (si aplica).
- [ ] Validar finalidades y transferencias a proveedores (Sanity, Vercel, Resend, GA4).
