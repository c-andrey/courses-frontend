const footer = {
    render: () => {
        return `
            <div class="footer-container">
                <div class="footer-section-logo">
                    <div class="container-logo">
                        <img src="assets/images/revvo-logo.png" class="logo"/>
                        <p>We provide the best courses to help you learn and grow in your career. Join us today!</p>
                    </div>
                    
                </div>
                <div class="footer-section">
                    <div class="footer-section-links">
                        <h4>Contato</h4>
                        <p>
                            <a href="mailto:asd@asd.com">
                                <i class="fas fa-envelope"></i>
                                asd@asd.com
                            </a>
                        </p>
                        <p>
                            <a href="tel:+5511999999999">
                                <i class="fas fa-phone"></i>
                                +55 11 99999-9999
                            </a>
                        </p>
                    </div>
                    <div class="footer-section-social">
                        <h4>Follow Us</h4>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        `;
    },
};

export default footer;
