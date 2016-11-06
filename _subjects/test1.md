---
title: Pleje og hjælp
preferredLabel: Pleje og hjælp
altLabels:
- 'Matas'
- 'Masagge'
relations:
- id: 5
  label: Sundhed, velvære og pleje
  reltype: broader
---

<h1>{{page.preferredLabel}}</h1>
<dl>
{% for alt in page.altLabels %}
  <dt>Altlabel</dt>
  <dd>{{alt}}</dd>
{% endfor %}
</dl>
