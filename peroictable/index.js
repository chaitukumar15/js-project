document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll('input[name="filter"]');
    const elements = document.querySelectorAll('li');

    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const selectedClass = filter.id;

            elements.forEach(element => {
                if (selectedClass === "all" || element.classList.contains(selectedClass)) {
                    element.classList.remove("hidden");
                } else {
                    element.classList.add("hidden");
                }
            });
        });
    });
});
