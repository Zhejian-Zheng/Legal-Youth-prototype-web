// Legal Youth - Shared JavaScript Utilities

// Common alert messages for demo purposes
const DemoMessages = {
    search: 'Search functionality would be implemented here',
    aiAssistant: '🤖 AI Legal Assistant\n\nWelcome! I can help you with:\n• Legal questions and advice\n• Document explanations\n• Rights clarification\n• Process guidance\n\nWhat would you like to know about?',
    login: '🔐 Login\n\nUsername/Email: [Enter your credentials]\nPassword: [Enter your password]\n\nRemember me: ☑️\nForgot password? Click here',
    signup: '📝 Sign Up\n\nCreate your Legal Youth account:\n\nFull Name: [Enter your name]\nEmail: [Enter your email]\nPassword: [Create password]\nConfirm Password: [Confirm password]\n\nI agree to Terms of Service ☑️',
    forum: 'Community Forum\n\nJoin discussions about legal topics, share experiences, and connect with others who are navigating similar legal situations.',
    quizzes: '🎯 Legal Quizzes\n\nTest your knowledge with interactive quizzes:\n\n• Employment Rights Quiz\n• Tenant Rights Quiz\n• Consumer Rights Quiz\n• Family Law Quiz\n• Education Rights Quiz',
    templates: '📄 Legal Templates\n\nDownload free legal document templates:\n\n• Employment Contract Template\n• Tenant Rights Letter Template\n• Consumer Complaint Template\n• Wage Claim Form Template\n• Eviction Response Template',
    lawyer: '👨‍💼 Book Volunteer Lawyer\n\nSchedule a free consultation with a volunteer lawyer:\n\n• Employment Law Consultation\n• Housing Rights Consultation\n• Family Law Consultation\n• Consumer Rights Consultation\n• Education Rights Consultation',
    calculate: 'Legal Calculate\n\nCollect and Calculate Your Legal Data:\n\nData Collection Tools:\n   • Case Information Gatherer\n   • Evidence Documentation Tracker\n   • Timeline Event Collector\n   • Financial Impact Calculator\n   • Risk Assessment Tool',
    checklist: 'Rights Checklist\n\nInteractive checklists to protect your rights:\n\n• Employment Rights Checklist\n• Tenant Rights Checklist\n• Consumer Rights Checklist\n• Student Rights Checklist\n• Digital Privacy Checklist',
    timeline: 'Case Timeline\n\nTrack your legal case progress:\n\n• Eviction Timeline\n• Employment Dispute Timeline\n• Consumer Complaint Timeline\n• Family Law Timeline\n• Education Appeal Timeline'
};

// Utility functions
const Utils = {
    // Show demo alert
    showDemo: function(messageKey) {
        const message = DemoMessages[messageKey] || 'This feature would be implemented here.';
        alert(message);
    },

    // Toggle element visibility
    toggleElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    },

    // Smooth scroll to element
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Get current date in readable format
    getCurrentDate: function() {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Filter array by search term
    filterBySearch: function(array, searchTerm, fields) {
        if (!searchTerm) return array;
        
        const term = searchTerm.toLowerCase();
        return array.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toLowerCase().includes(term);
            });
        });
    },

    // Create star rating HTML
    createStarRating: function(rating, maxRating = 5) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '☆';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        return stars;
    },

    // Animate element on scroll
    animateOnScroll: function(element, animationClass) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                }
            });
        });
        observer.observe(element);
    }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize search functionality if search input exists
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = Utils.debounce(function(value) {
            // Search functionality would be implemented here
            console.log('Searching for:', value);
        }, 300);
        
        searchInput.addEventListener('input', function() {
            debouncedSearch(this.value);
        });
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, DemoMessages };
} 