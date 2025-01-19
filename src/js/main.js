document.getElementById('fetchData').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/courses');
        if (!response.ok) throw new Error('Erro ao buscar dados.');
        const data = await response.json();
        console.log(data);
        alert('Dados carregados com sucesso! Veja no console.');
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar os dados.');
    }
});
