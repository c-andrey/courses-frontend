const header = {
    render: () => {
        return `
        <header>
            <div class="container-logo">
                <img src="assets/images/revvo-logo.png" class="logo"/>
            </div>

            <div class="container-profile">
                <div class="search">
                    <input type="text" placeholder="Pesquisar cursos...">
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
};

export default header;
