REST API School homework

Na serveru by měla běžet stránka pokud se server nevypnul. Stává se to často a běžně ve škole. 

readBlogPosts: Tato funkce čte blogové příspěvky z JSON souboru. Pokud dojde k chybě při čtení souboru, vrátí prázdné pole.

writeBlogPosts: Tato funkce zapisuje blogové příspěvky do JSON souboru.

POST /api/blog: Tento endpoint vytváří nový blogový příspěvek. Příspěvek je vytvořen s unikátním ID, obsahem, autorem a časem vytvoření. Nový příspěvek je poté přidán do pole blogových příspěvků a uložen do JSON souboru.

GET /api/blog: Tento endpoint vrátí všechny blogové příspěvky.

GET /api/blog/:blogId: Tento endpoint vrátí konkrétní blogový příspěvek na základě jeho ID. Pokud příspěvek s daným ID neexistuje, vrátí chybu 404.

DELETE /api/blog/:blogId: Tento endpoint smaže konkrétní blogový příspěvek na základě jeho ID. Pokud příspěvek s daným ID neexistuje, vrátí chybu 404.

PATCH /api/blog/:blogId: Tento endpoint částečně aktualizuje konkrétní blogový příspěvek na základě jeho ID. Může aktualizovat obsah nebo autora příspěvku. Pokud příspěvek s daným ID neexistuje, vrátí chybu 404.


