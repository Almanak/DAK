---
title: Post- og kurertjenester
preferredLabel: Post- og kurertjenester
altLabels:
- Postbud
- Budbringelse
relations:
- id: 4
  label: Transport og trafik
  reltype: broader
---

<h1>{{page.preferredLabel}}</h1>
<dl>
{{ for alt in page.altLabels }}
  <dt>Altlabel</dt>
  <dd>{{alt}}</dd>
{{ endfor }}
</dl>
