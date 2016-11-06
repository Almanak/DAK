---
title: Fremstilling af fødevarer
preferredLabel: Fremstilling af fødevarer
altLabels:
- Fremstilling af madvarer
- Fremstilling af mælkeprodukter
relations:
- id: 1
  label: Fremstillingsvirksomhed
  reltype: broader
- id: 3
  label: Relationlabel
  reltype: related
---

<h1>{{page.preferredLabel}}</h1>
<dl>
{% for alt in page.altLabels %}
  <dt>Altlabel</dt>
  <dd>{{alt}}</dd>
{% endfor %}
</dl>
