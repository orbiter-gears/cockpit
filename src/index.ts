
const data = {
  archives: [] as string[]
};

const $selectArchive = window.document.body
  .appendChild(window.document.createElement('select'));

window
  .fetch('http://localhost:8080/')
  .then(response => response.json())
  .then((archives: string[]) => {
    data.archives = archives;
    $selectArchive.textContent = '';
    const groups: Record<string, HTMLOptGroupElement> = {};
    for (const [index, file] of archives.entries()) {
      const name = file.split('/', 2)[1];
      const type = file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
      const $option = window.document.createElement('option');
      $option.value = index.toString();
      $option.textContent = type;

      if (!groups.hasOwnProperty(name)) {
        const $group = groups[name] = $selectArchive
          .appendChild(window.document.createElement('optgroup'));
        $group.label = name;
      }
      const $group = groups[name];
      $group.appendChild($option);
    }
  });
