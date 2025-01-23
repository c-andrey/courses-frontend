import debounce from '../utils/debounce.js';

const header = {
    render: () => {
        return `
        <header>
            <div class="container-logo">
                <img src="assets/images/revvo-logo.png" class="logo"/>
            </div>

            <div class="container-profile">
                <div class="search">
                    <input type="text" class="search-input" placeholder="Pesquisar cursos...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="profile">
                        <img src="https://randomuser.me/api/portraits/thumb/men/75.jpg" class="avatar"/>
                    
                    <div class="profile-name-container">
                        <span class="profile-message">Seja bem-vindo</span>
                        <span class="profile-name">John Doe</span>
                    </div>

                    <div class="chevron">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        </header>
        `;
    },
    init: (onSearch) => {
        const searchInput = document.querySelector('.search-input');
        const handleSearch = debounce((event) => {
            const filter = event.target.value.trim();
            onSearch({ filter });
        }, 500);
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
    },
};

export default header;
