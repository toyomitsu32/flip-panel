import { useEffect, useState } from "react";

// ── スライド画像URL（ホワイトボード風スライド 全14枚）──
const SLIDE_URLS = [
  // slide 1 - タイトル
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/M8ONdrjuUPjoaZcHHu1BkE_1774634302324_na1fn_c2xpZGVfMV90aXRsZV9nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L004T05kcmp1VVBqb2FaY0hIdTFCa0VfMTc3NDYzNDMwMjMyNF9uYTFmbl9jMnhwWkdWZk1WOTBhWFJzWlY5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rUEZ12bBxm37k~U9Ex9e2xpYDp8EqA9pVn4EtRAdS0Zv-1Wovvj9q-J8FghGtutXd485BLmQ8SRNm-no6FIM4D15qVmk7fx3UPE2tZn-CqB505Iov~h4ER2YB0Gt83PIUiPh-rMXsCZDdsbAVd69dD8PCOf9xOmX10R-0d8GSTMppt-wJn2FI0CYeIJhVDFaaxhL5OFoqX8Bbix8JHrI5RnC7ySib7au1bRrFlGlPPztKuffFR1jXcvk~NZGjTZ9~pBi5EukiJ8MqGzQASV0957qR4lQaWfrlQX5F~96hdJ7L9biiybTwNyx6ncfARP6gTdZUhmaH88Eoe5-8XepcA__",
  // slide 2 - アジェンダ
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_qP2l0cz8Pmlebzm1D8gO5u_1774634368891_na1fn_c2xpZGVfMl9hZ2VuZGFfZ2VuZXJhdGVk.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfcVAybDBjejhQbWxlYnptMUQ4Z081dV8xNzc0NjM0MzY4ODkxX25hMWZuX2MyeHBaR1ZmTWw5aFoyVnVaR0ZmWjJWdVpYSmhkR1ZrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=wG4~KKEp9Te5uW~qYx5T98x95n-gFidF3O~oD5tZofht~8K45lfWoopJVRgpWIjmgMRsmtfZy~ipmOp44qBglsJy~S2J~2BCaE~1kQ9C98V7RtPGcJkoDaU7Kjo2CVMZMgKie--q3BhVTf-hYc~s6aa6UTkuk9foNAJRMkrTq~aJ4-ZUjMtiM9ojl7kabT0-L8GR6mGGzrS80Quz~L7nGQhDcWX-Ov-h3lt4E~xoVS~SGj7ZSbW1klOIDgrZvTgi0LHlCTl9R81fwQtYIwIfcoTSxGi-jmS6yfY-9yJ7SCwk933VQMTouTAGUkJrEiQB5cHgl9rdb31sWvvYFCXzFw__",
  // slide 3 - プロダクト1
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_rJN1Pb4e8WOJPhqblmICEt_1774634378461_na1fn_c2xpZGVfM19wcm9kdWN0XzFfZ2VuZXJhdGVk.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfckpOMVBiNGU4V09KUGhxYmxtSUNFdF8xNzc0NjM0Mzc4NDYxX25hMWZuX2MyeHBaR1ZmTTE5d2NtOWtkV04wWHpGZloyVnVaWEpoZEdWay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd180MDk2LGhfNDA5Ni9mb3JtYXQsd2VicC9xdWFsaXR5LHFfOTUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=az~r9o-HM8i~00Uf5coqkzHc0kCZR62VIfsqlq53a4oWIfgh~CsHBq5USv8T0EjiXIrRKyUb6jA66DMIJtFAsftPVnuOPfBpQ22Xq36CHdTgyrqn5Ql8zPjtFO~fX4lfGyzQlerd3Rc6bTK62c~yBFXluk6oHnmi6RQKEw6U3wOj6iq-GLXzC4gIWhozYFBsLKQQQi5n3YOGKHNnUyg57-vuUetqDlE8vBIjwYgHZ-PrNkno3z8Tkqu~dl5k2kxq-mZicK~1~iYRWN83~MKic6eeo9KajMYJ2riea7KmDdy3PSPntOLZXuSd9AXDd9EQ5Q~MG5w03BGcFMY98CZ05w__",
  // slide 4 - プロダクト2
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_OAc7EjWZTqJPHgt2VVbruC_1774634426433_na1fn_c2xpZGVfNF9wcm9kdWN0XzJfZ2VuZXJhdGVk.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfT0FjN0VqV1pUcUpQSGd0MlZWYnJ1Q18xNzc0NjM0NDI2NDMzX25hMWZuX2MyeHBaR1ZmTkY5d2NtOWtkV04wWHpKZloyVnVaWEpoZEdWay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd180MDk2LGhfNDA5Ni9mb3JtYXQsd2VicC9xdWFsaXR5LHFfOTUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZhMNBk5j4PvOnL7uQ4OL1Up-BCvRk2TLYvBuqxzVNMU1mnkcBHhOiwuZ5rO08ZD0IQsH6xkUreSX3V8h0uqtlSc2ejMgRIzZx6akxwUOOiGl46wMAKfNJ0Ok~hC717i8u04r4VPYIJhn0B0OtRer3a4hHI~NJdKuS2GMYDemJflDPc5VqbF3IzX~N83HXsnyT1ZZG96Z2YXTqdlF9yGqWwjRqUK7ha1uTmWHufj7EThKfnlA-CCvZdH-9fGSaVqedHsVMgZLxU3ifpIYab~T7g2mEENuTya1LDwKLssCAs9XWgHRLSmL2sknLHzFPJ0aV7NYfSlPxPEWlEiNPqMVpA__",
  // slide 5 - プロダクト3
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_JoL5A5abR5BIqtUNuVK2Xr_1774634373488_na1fn_c2xpZGVfNV9wcm9kdWN0XzNfZ2VuZXJhdGVk.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfSm9MNUE1YWJSNUJJcXRVTnVWSzJYcl8xNzc0NjM0MzczNDg4X25hMWZuX2MyeHBaR1ZmTlY5d2NtOWtkV04wWHpOZloyVnVaWEpoZEdWay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd180MDk2LGhfNDA5Ni9mb3JtYXQsd2VicC9xdWFsaXR5LHFfOTUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dzxEACvNak6h3y-7M895hOhjgXybQRBfTHXXgsATjyGBi~4u8NqUPub~dwOzHUwETbT-jENNDbmgY1F3n5UcSGqtjfBRiHaHzndsEN--lcQVIcc1AvZyFDipkF29fXSeeh62sLCLCASac4-bRXrGS~-f9NiRG~xxyScUEcifjfZIAXOV8JWkg-1HUbIf9fU~I8k3UJHtDAD7FYigWLk~KcV8rrzolOgTLyTAoEWg7jBtL-4knYkJR2tqvhcBR6-80umcBy8Gms3PxFjMpp4wAMEsYqT~PVUsD0ecmvQE8adORu6BFr6r7yqFQ04vvi4~1LsM2wtW6ut0j0LJRAFPIA__",
  // slide 6 - 開発思想
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_HHyiGswpt5E88VxZpyiQ02_1774634371751_na1fn_c2xpZGVfNl9waGlsb3NvcGh5X2dlbmVyYXRlZA.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfSEh5aUdzd3B0NUU4OFZ4WnB5aVEwMl8xNzc0NjM0MzcxNzUxX25hMWZuX2MyeHBaR1ZmTmw5d2FHbHNiM052Y0doNVgyZGxibVZ5WVhSbFpBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TZELgg4pRUbLoZ6IjbMfbwi9Ll5MDVLXXkLSIFhWbRcrQ-1e0GeDDsbjodViFq-U0bLIwGsVN~oCcDh~LprkK2v1U8GLlrA5oxEkpOaprHbbPX~QHtw5gun9i3KRJjjubiSrVkjbmqFSs6GMGZV~2Ou9WsRYBobVTXxzD1atO5wNeE01I6Enw5abecqPaSEEh944u4-ubHSlkVhhPBCzm-SLF-7yhT-dS~2TCQzMylA~raSqzSjYxvEBLSmcZ2-D7aIgdlUAkfv6F35CMuqMb2ngAQdwJF9G-2XLX5okzrcLq9RHvgsFWwwxVOMYRUN9GxKLnLKHBOb0Sg6jzAXDDQ__",
  // slide 7 - MVV
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_cziTiQKwgFygawp62xa7xp_1774634518034_na1fn_c2xpZGVfN19tdnZfZ2VuZXJhdGVk.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfY3ppVGlRS3dnRnlnYXdwNjJ4YTd4cF8xNzc0NjM0NTE4MDM0X25hMWZuX2MyeHBaR1ZmTjE5dGRuWmZaMlZ1WlhKaGRHVmsucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfNDA5NixoXzQwOTYvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzk1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BEHld6kU6wUUYz7sA7luh1DPKoUXC7GtPi2qa1JPLVG~mROVu8q~95LkkYqDfUkb-~PABDwqkaPsZQDcHmDknWZTV4tQwB9T0dUvFm30hPthXkp~~vNCoxk84WujjUvKBO5~VG2vtDKVBnAIZhczwEd9W5VFCn39wPopPMOTfCTImP1~48TF965xXMSKh37rWjFMTJnLshCkR5zki27wGs1FlKcE0oTaGG3shcaFjVzMSRHVJHgC7kb6372N97WOOYSQbjepA2GaUkp1l62egbr0dYTkkoZqpePd1O8A8BWpOz85dFgfYQGwI-EHFFva0ngOF-GcjikK0W0pmcfe9A__",
  // slide 8 - フィードバック
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_zvErB8GAPYKhZWTKd7AETt_1774634514426_na1fn_c2xpZGVfOF9mZWVkYmFja19nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfenZFckI4R0FQWUtoWldUS2Q3QUVUdF8xNzc0NjM0NTE0NDI2X25hMWZuX2MyeHBaR1ZmT0Y5bVpXVmtZbUZqYTE5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=N5Osq73zIjyVH-ZeWRYf19aP78pqhkQqAWd57JUSlXtGgwpGdIhU3HrS~lD2L0-ES6CA2hToGv5gAkjvtjKm9XB88RNU5BJ-ke6sxOWYx8T2~cAIwLLBYQZyggmVrI5Yp1KMsxoeZH7KXw-wV7ckJW2ROwmNi6RgXDoGRsIo7a9yl2cNbe4HWd2jTYYJSN-QJo7RdP1WCLT4w9ioTuoF20JleWs-THTWaMfsQR6zlUGY5Qy3GsUzV4Yc8i4YUH6ooTtuOfpmoqgSfuoOHmCnw2gVVTBpoiKbJXmwbQLmDLUz93ZW2yna1hUMKFOtjYxPzwgrwyFdOekK-0FhB3~Flg__",
  // slide 9 - インフラ
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_qkkpQf0lOAB1cRHBVXvhOD_1774634526525_na1fn_c2xpZGVfOV9pbmZyYXN0cnVjdHVyZV9nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfcWtrcFFmMGxPQUIxY1JIQlZYdmhPRF8xNzc0NjM0NTI2NTI1X25hMWZuX2MyeHBaR1ZmT1Y5cGJtWnlZWE4wY25WamRIVnlaVjluWlc1bGNtRjBaV1EucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfNDA5NixoXzQwOTYvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzk1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gBWeE9SUzElJhi1qWWsnX6nnj9fkvMjMTb8Wntr9qvbHa8eQa4IOvTu-9hrimjBmIidT17a6blEjnnOqVR3LEghl97OA8Fj8KpKEZExOFk5Fao9n1wshbXn7~Sqvcisj6PlLhNM5SR0YimOHEn6kHsBhrXb7eG8AF5a24m8AbL79C2Iz8JC52n9Y5ykSruVEtAaW-75GvT3qu2DjK3SBeEXenqHdaYWGTkD~bKQgcEoRI~ydhfdVF7iBqe8FMi7Ujk3WE93yL3SeRb1In6GghAdY9Zdvp5foJqTBo-8moqddXr5vz845s9ITSdScNUv~xVUNaJWcdcbLqDwSmqeXbA__",
  // slide 10 - Google AI Studio
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_bjy8QlJmtZlmscDjTxVwA7_1774634514291_na1fn_c2xpZGVfMTBfZ29vZ2xlX2FpX3N0dWRpb19nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfYmp5OFFsSm10Wmxtc2NEalR4VndBN18xNzc0NjM0NTE0MjkxX25hMWZuX2MyeHBaR1ZmTVRCZloyOXZaMnhsWDJGcFgzTjBkV1JwYjE5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rqSqVtHemNakTfpneJmMFo9uwEnrD3w-k~AKYKqstNdGfke-6Pgr--cB3~2HLhjQDaSFb04UF82ZvXXAMU5LrmVHHVDdSR9fM-ipfgb3XhW6HcbuqRs-QDAqVmH-zkT5kN4Z-AhqPOGAucpP7q5A4YYDY~YC8GxDZySgCgnpzwX~YOfjhgE0HLDcAWP3gJ9XyFJc7kS~hrx0EGHhAWX4aW4PU9EqS3ESbO4iIqxU6WJ1nvHiuznIPV8HiB8a~JsYls5ImP-skHAd4~6bPNK10A-xvZ8iaO2vAO5wHeCepC9xr8l~JhEnoIeYArhl2n0~MTNUUlzq8V1eoU85hwI5Qg__",
  // slide 11 - 開発フロー
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_TOSUzjmZJsRkBiSai0CfNj_1774634504875_na1fn_c2xpZGVfMTFfZGV2ZWxvcG1lbnRfZmxvd19nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfVE9TVXpqbVpKc1JrQmlTYWkwQ2ZOal8xNzc0NjM0NTA0ODc1X25hMWZuX2MyeHBaR1ZmTVRGZlpHVjJaV3h2Y0cxbGJuUmZabXh2ZDE5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=A-dDcLufDHI3QlsvRJjIa08dfgT7Wez8DoBMb-jDOV8t05CVyCXe9FkfAKBMXmxxaHYFc5qRdegHADUfVki1w0FRKA44-m9nynafpHlvt2CXCHb0LU8qyqFgf2~hVmssO4G4RKwC-N5Harj1nfH4amnMnsSlSOgFYAJ5q8gKPM0qdeLj5jD-D1iUBw5wiy~7cXdXb4Yid58Qe8Cpkuu1qQHW8eIIuGHfjNxbVEdRtXgi0nYOih10Od3GG1UD3OcSuuvSA6ntF3bx8lVmUbWEo5GiQ8jU1gLftKdHP9ZUN2cXu8GB~HXB5ctx6V6Uv4QyOoz8wRQZYwj2mctISCZRDQ__",
  // slide 12 - 展望
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_07VqJzxj8pNyCMibgl8OP7_1774634620705_na1fn_c2xpZGVfMTJfZXhwYW5zaW9uX2dlbmVyYXRlZA.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfMDdWcUp6eGo4cE55Q01pYmdsOE9QN18xNzc0NjM0NjIwNzA1X25hMWZuX2MyeHBaR1ZmTVRKZlpYaHdZVzV6YVc5dVgyZGxibVZ5WVhSbFpBLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RS6Gkges7Lfj0kaPu1vvNO6jJrQK072n~9X8k1afCB2gQgb~1zcWkFOwdiz1NOPWywnwwL3MEJIoO2KuhFgV5LA1F8nxLP5k55MfCgqh7DwhYf4vT2pUL0iwr3iWb5ABcnuM145MbCn1mqrJp3JnQCDTfk4kquosQ4AIZydGqNoqoPaV3cucaT0yHxt4WGmilQtziQE~Sy9t9LD1gRh1slB4QYFRTFt6j8db4Vjba6XtncI9vBFII9Jj9WLnCO7RgY-3YcsyYnydJcnNyljcLuWah5rpkHMpSUFboxpnjuMsWbEXYhmYNXe7Cia4333tSnQPt3936sOADHPKMm1rqQ__",
  // slide 13 - まとめ
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_VRRkEsORbADjFmPL8vCWxV_1774634598636_na1fn_c2xpZGVfMTNfc3VtbWFyeV9nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfVlJSa0VzT1JiQURqRm1QTDh2Q1d4Vl8xNzc0NjM0NTk4NjM2X25hMWZuX2MyeHBaR1ZmTVROZmMzVnRiV0Z5ZVY5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c5-1mXZ0OUFIHdFvXEG4aj8U1xkgYrorzFEE416KmrEl8JXC0vAuPmACAeCJbLfa3PU4VWiy02zxZum7X39TvFMFP79zSwBlhGLQoll3-DEzIEbi0IkcKeGV~mS9JGgHTFmU3xj5aHh5DzsKYTQKrQTLsEZPcO130-eYoZ7KMhZ2EtPH~uhURmyiflxpak0R6Ud4voo2nMwKHzPRVRCJGgTG4EhLpxLkZcTT7FNAn5dKxdu0owoIY0AvbZFKwZi1nYLhi3Ohk29x60Cfx-qC4MWalaZVoI~YaTWzmQvYGnUzHv4JSgBMsd8NXywYH3msOgYUkWGr-MTYDChycdCC4A__",
  // slide 14 - クロージング
  "https://private-us-east-1.manuscdn.com/sessionFile/rXCftHSwGdu1UtKNBvfBTm/sandbox/tooluse_DsOvnr41JxnvOdxMwuBbEB_1774634622916_na1fn_c2xpZGVfMTRfY2xvc2luZ19nZW5lcmF0ZWQ.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_95&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvclhDZnRIU3dHZHUxVXRLTkJ2ZkJUbS9zYW5kYm94L3Rvb2x1c2VfRHNPdm5yNDFKeG52T2R4TXd1QmJFQl8xNzc0NjM0NjIyOTE2X25hMWZuX2MyeHBaR1ZmTVRSZlkyeHZjMmx1WjE5blpXNWxjbUYwWldRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzQwOTYsaF80MDk2L2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV85NSIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hukfKM~EImROc2oL2ruTmYUNkA4wKIGwxJtjC1Xs0DPhrfw-Vz8~2-QoSbEfciGKXNxnOdzz3Dr6H8gSjPTmmqxSAX16S8pi-5OxAyhe3-4kmBqnUWcs~GuF1wL4GUNUFP51aDNVpga~S92izIX4QEf3Gi~MewbZLSqTdEKceJ9ULBr8qszpjTTANzrc8I2dStl42l-O4c-9Ts01Df~pGt0o0tY4~dH6FTTZBARFr1cjuDgKLMxsG5M5KwtoGTYd8oXQfTVrcG8m~YH7U5Zovn-fqG7qz3nMQq4H~37GXBGIcgMfcOftgZ7zLXqBFnXC-PDhcNbS6OBpBRI~0MxmWw__",
];

// ── トピック定義（各パネルに対応するスライドのインデックス範囲）──
const topics = [
  { id: 1, label: "プロダクト紹介",  emoji: "🛠️", title: "作ってきた3つのプロダクト",              desc: "スキルマーケット / ノウハウ図書館 / トークブリッジ", slides: [2, 3, 4] },
  { id: 2, label: "開発思想",        emoji: "💡", title: "「人の背中を押すもの」を作る",           desc: "単なる効率化ではなく、体験を変える（DX）とは？",    slides: [5] },
  { id: 3, label: "MVVの話",         emoji: "🎯", title: "MVVが機能追加の判断基準になる",          desc: "個人開発でもMVVを設定する理由",                    slides: [6] },
  { id: 4, label: "フィードバック",  emoji: "🗣️", title: "泥臭いフィードバックが品質を作る",       desc: "完成を待たず1人に使ってもらう大切さ",              slides: [7] },
  { id: 5, label: "インフラ構成",    emoji: "⚙️", title: "Claude Code × Google AI Studio",        desc: "バックエンドなし・フロントエンドのみで動く理由",   slides: [8, 9] },
  { id: 6, label: "開発フロー",      emoji: "🔄", title: "クオリティ優先の泥臭い開発フロー",       desc: "手動コピペでも最適解な理由とは？",                 slides: [10, 11] },
  { id: 7, label: "まとめ",          emoji: "✅", title: "まとめ ─ 個人開発でここまでできる",          desc: "LLM × フロントエンドで価値を届けるために",           slides: [12, 13] },
];

// ── カードごとの背面カラー（POP手書き風）──
const CARD_COLORS = [
  { bg: "#FFE135", border: "#E8C200", text: "#1a1410" },
  { bg: "#FF7043", border: "#E64A19", text: "#fff" },
  { bg: "#EC407A", border: "#C2185B", text: "#fff" },
  { bg: "#42A5F5", border: "#1565C0", text: "#fff" },
  { bg: "#66BB6A", border: "#2E7D32", text: "#fff" },
  { bg: "#AB47BC", border: "#6A1B9A", text: "#fff" },
  { bg: "#FF7043", border: "#E64A19", text: "#fff" },
];

// ── スライドビューアーモーダル（全画面）──
function SlideViewer({
  slideIndexes,
  onClose,
}: {
  slideIndexes: number[];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = slideIndexes.length;
  const url = SLIDE_URLS[slideIndexes[current]];

  // キーボード操作
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrent((c) => Math.min(total - 1, c + 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrent((c) => Math.max(0, c - 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [total, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#1a1a1a" }}
    >
      {/* 上部バー */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ background: "#111", borderBottom: "3px solid #FFE135" }}
      >
        <span className="text-sm font-bold tracking-widest" style={{ color: "#FFE135", fontFamily: "'Fredoka One', cursive" }}>
          📋 スライドビューアー
        </span>
        <div className="flex items-center gap-4">
          {total > 1 && (
            <>
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="px-4 py-1.5 rounded font-bold text-sm disabled:opacity-30"
                style={{ background: "#333", color: "#FFE135", fontFamily: "'Fredoka One', cursive", fontSize: "16px" }}
              >
                ← 前へ
              </button>
              <span className="text-base font-bold" style={{ color: "#fff", fontFamily: "'Fredoka One', cursive" }}>
                {current + 1} / {total}
              </span>
              <button
                onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                disabled={current === total - 1}
                className="px-4 py-1.5 rounded font-bold text-sm disabled:opacity-30"
                style={{ background: "#333", color: "#FFE135", fontFamily: "'Fredoka One', cursive", fontSize: "16px" }}
              >
                次へ →
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="text-sm font-bold px-4 py-1.5 rounded ml-4"
            style={{ background: "#EC407A", color: "#fff", fontFamily: "'Fredoka One', cursive", fontSize: "16px" }}
          >
            ✕ 閉じる
          </button>
        </div>
      </div>

      {/* スライド画像 ─ 残り全画面 */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: "#1a1a1a", minHeight: 0 }}
      >
        <img
          src={url}
          alt={`スライド ${slideIndexes[current] + 1}`}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* 下部ヒント */}
      <div
        className="text-center py-2 shrink-0 text-xs"
        style={{ color: "#aaa", background: "#111", fontFamily: "'Zen Maru Gothic', sans-serif" }}
      >
        ← → キーでスライド切り替え　　ESC で閉じる
      </div>
    </div>
  );
}

// ── フリップカード（クラフト紙 × POP手書き風）──
function FlipCard({
  topic,
  flipped,
  onClick,
  colorIndex,
}: {
  topic: typeof topics[0];
  flipped: boolean;
  onClick: () => void;
  colorIndex: number;
}) {
  const color = CARD_COLORS[colorIndex % CARD_COLORS.length];
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={onClick}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          borderRadius: "16px",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "16px",
            background: "linear-gradient(145deg, #f5e6c8 0%, #e8d5a8 60%, #d9c48a 100%)",
            border: "3px solid #c8a84b",
            boxShadow: "4px 4px 0px #b8943a, 0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{ color: "#8B6914", fontFamily: "'Fredoka One', cursive", fontSize: "13px", letterSpacing: "3px", marginBottom: "10px" }}>
            TOPIC {String(topic.id).padStart(2, "0")}
          </div>
          <div
            className="select-none"
            style={{ color: "#c8a84b", fontFamily: "'Fredoka One', cursive", fontSize: "80px", lineHeight: 1, marginBottom: "10px", textShadow: "2px 2px 0 rgba(139,105,20,0.3)" }}
          >
            ?
          </div>
          <div style={{ color: "#5a3e10", fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: "20px", fontWeight: 900 }}>
            {topic.label}
          </div>
          <div className="absolute bottom-4 right-5" style={{ color: "#a08040", fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: "12px" }}>
            タップして開封！
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            background: color.bg,
            border: `4px solid ${color.border}`,
            boxShadow: `4px 4px 0px ${color.border}, 0 8px 24px rgba(0,0,0,0.2)`,
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "6px" }}>{topic.emoji}</div>
          <div style={{ color: color.text, fontFamily: "'Fredoka One', cursive", fontSize: "11px", letterSpacing: "3px", opacity: 0.8, marginBottom: "6px" }}>
            TOPIC {String(topic.id).padStart(2, "0")}
          </div>
          <div
            style={{
              color: color.text,
              fontFamily: "'Fredoka One', cursive",
              fontSize: "22px",
              lineHeight: 1.3,
              marginBottom: "8px",
              textShadow: "1px 1px 0 rgba(0,0,0,0.15)",
              borderBottom: `3px solid ${color.text === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)"}`,
              paddingBottom: "8px",
            }}
          >
            {topic.title}
          </div>
          <div style={{ color: color.text, fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: "13px", opacity: 0.9, lineHeight: 1.5 }}>
            {topic.desc}
          </div>
          <div
            className="mt-4 font-bold px-5 py-2 rounded-full"
            style={{
              background: color.text === "#fff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)",
              color: color.text,
              fontFamily: "'Fredoka One', cursive",
              fontSize: "15px",
              border: `2px solid ${color.text === "#fff" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)"}`,
            }}
          >
            ▶ スライドを見る
          </div>
        </div>
      </div>
    </div>
  );
}

// ── メインページ ──
export default function Home() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [viewer, setViewer] = useState<number[] | null>(null);

  const handleCardClick = (topic: typeof topics[0]) => {
    if (!flipped.has(topic.id)) {
      // 初回クリック → めくる
      setFlipped((prev) => { const next = new Set(prev); next.add(topic.id); return next; });
    } else {
      // 2回目クリック → スライドビューアーを開く
      setViewer(topic.slides);
    }
  };

  const reset = () => setFlipped(new Set());
  const opened = flipped.size;
  const total = topics.length;

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-10"
      style={{
        background: "linear-gradient(160deg, #FFF8E7 0%, #FFF0C8 40%, #FFE8A8 100%)",
        fontFamily: "'Zen Maru Gothic', sans-serif",
      }}
    >
      {/* ヘッダー ─ ホワイトボード風 */}
      <div
        className="w-full max-w-5xl rounded-2xl px-8 py-6 mb-10 text-center"
        style={{
          background: "linear-gradient(145deg, #fff9e6, #fff3cc)",
          border: "4px solid #FFE135",
          boxShadow: "6px 6px 0px #E8C200, 0 12px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* ボード上部のフレーム */}
        <div
          style={{ color: "#8B6914", fontFamily: "'Fredoka One', cursive", fontSize: "14px", letterSpacing: "3px", marginBottom: "12px" }}
          >
            🎉 リベシティ × スキルマーケットオフ会
        </div>
        <h1
          className="leading-tight mb-3"
          style={{ color: "#1a1410", fontFamily: "'Fredoka One', cursive", fontSize: "clamp(26px, 5vw, 46px)" }}
        >
          LLMを使ったWebアプリ開発の裏側
          <br />
          <span style={{ color: "#E64A19", fontSize: "1.1em" }}>全部見せます！</span>
        </h1>
        {/* 手書き風アンダーライン */}
        <div
          className="mx-auto mb-3"
          style={{ width: "70%", height: "4px", background: "linear-gradient(90deg, #FFE135, #FF7043, #EC407A)", borderRadius: "4px" }}
        />
        <p style={{ color: "#7a5a20", fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: "16px", fontWeight: 700 }}>
          対談トピックパネル ─ クリックしてテーマを開封しよう！🎊
        </p>
      </div>

      {/* ヒント */}
      <p className="mb-6" style={{ color: "#8B6914", fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: "15px", fontWeight: 700 }}>
        👆 1回クリック → パネルをめくる　　2回クリック → スライドを表示
      </p>

      {/* 進捗バー */}
      <div className="w-full max-w-5xl mb-8">
        <div className="flex justify-between mb-2" style={{ color: "#8B6914", fontFamily: "'Fredoka One', cursive", fontSize: "15px" }}>
          <span>開封済みトピック</span>
          <span>{opened} / {total}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#e8d5a8", border: "2px solid #c8a84b" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(opened / total) * 100}%`,
              background: "linear-gradient(90deg, #FFE135, #FF7043, #EC407A)",
            }}
          />
        </div>
      </div>

      {/* グリッド */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {topics.map((topic, i) => (
          <FlipCard
            key={topic.id}
            topic={topic}
            flipped={flipped.has(topic.id)}
            onClick={() => handleCardClick(topic)}
            colorIndex={i}
          />
        ))}
      </div>

      {/* リセットボタン */}
      <button
        onClick={reset}
        className="px-10 py-3 rounded-full font-bold"
        style={{
          background: "#fff",
          color: "#8B6914",
          border: "3px solid #c8a84b",
          boxShadow: "4px 4px 0px #c8a84b",
          fontFamily: "'Fredoka One', cursive",
          fontSize: "18px",
        }}
      >
        ↺ パネルをリセット
      </button>

      {/* スライドビューアー */}
      {viewer && (
        <SlideViewer slideIndexes={viewer} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}
