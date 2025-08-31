// BroVerse Countdown Widget v2.0
// Following HAIKU principles with all avatars

class BroVerseCountdown {
    constructor() {
        // Target date: November 30, 2025 (90 days from September 1, 2025)
        this.targetDate = new Date('2025-11-30T00:00:00');
        this.startDate = new Date('2025-09-01T00:00:00');
        
        // Elements
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            progress: document.getElementById('progress'),
            progressText: document.getElementById('progress-text'),
            avatarLayer: document.getElementById('avatar-layer')
        };
        
        // All avatar images from Supabase
        this.avatars = [
            // Big Sis avatars
            'big-sis/bigsis.jpg',
            'big-sis/3nwlddgsct6bhv0z-wpjg_979a72f12fca4c52ae1be5600e5b5eca.jpg',
            'big-sis/5hwtk9zlkfrapy6r2bvc-_838327f0562a44aa96dbef490c11c136.jpg',
            'big-sis/5xo3spjae0q9xbtuocsjp_53bd3e66e6f249e7824d148f29a1e4f8.jpg',
            'big-sis/9m0wrptopoz9phq8izcj5_31bc35e3a3224bc6b986111f856d4927.jpg',
            'big-sis/bpaxf7tymqj0pyvibtcak_e593b33055e5476fa94b9610b40facbe.jpg',
            'big-sis/fw6glqfvlzflyugg43pp8_fd93e21d75c6403d851385e03fb2337b.jpg',
            'big-sis/hgeqakrb81vwqxddtppmc_75b5cc4d48f14cc9b2e48957c985d938.jpg',
            
            // Lil Sis avatars
            'lil-sis/lilsis_anime_kawaii.png',
            'lil-sis/lilsis_anime_kawaii_v2.png',
            'lil-sis/lilsis_creative_happy.png',
            'lil-sis/lilsis_creative_happy_v2.png',
            'lil-sis/lilsis_neon_cool.png',
            'lil-sis/lilsis_neon_cool_v2.png',
            'lil-sis/lilsis_digital_native.png',
            'lil-sis/lilsis_cyber_punk.png',
            'lil-sis/lilsis_electric_energy.png',
            'lil-sis/lilsis_graffiti_artist.png',
            'lil-sis/lilsis_underground_cool.png',
            'lil-sis/lilsis_rebel_confident.png',
            'lil-sis/lilsis_paint_splash.png',
            'lil-sis/lilsis_street_style.png',
            'lil-sis/lilsis_city_lights.png',
            'lil-sis/lilsis_victory_excited.jpg',
            'lil-sis/lilsis_peace_sign.jpg',
            
            // Bro avatars
            'bro/bro_dj_happy.png',
            'bro/bro_party_king.png',
            'bro/bro_music_vibes.png',
            'bro/bro_festival_excited.png',
            'bro/bro_beats_confident.png',
            'bro/bro_concert_happy.png',
            'bro/bro_dancing_joy.png',
            'bro/bro_neon_party.png',
            'bro/bro_turntable_focused.png',
            'bro/bro_sound_wave.png',
            'bro/bro_stage_presence.png',
            'bro/bro_crowd_hype.png',
            
            // CBO avatars
            'cbo/cbo_business_confident.jpg',
            'cbo/cbo_money_success.jpg',
            'cbo/cbo_deal_maker.jpg',
            'cbo/cbo_growth_chart.jpg',
            'cbo/cbo_crypto_rich.jpg',
            'cbo/cbo_gold_standard.jpg',
            'cbo/cbo_profit_happy.jpg',
            'cbo/cbo_market_winner.jpg',
            'cbo/cbo_suit_sharp.jpg',
            'cbo/cbo_yacht_luxury.jpg'
        ];
        
        this.baseUrl = 'https://imqpmvkloxoxibbrwwef.supabase.co/storage/v1/object/public/avatars/';
        
        // Shuffle avatars for random order
        this.shuffleArray(this.avatars);
        
        // Current avatar tracking
        this.currentAvatarIndex = 0;
        this.avatarElements = [];
        this.maxAvatars = 2; // Keep 2 avatars in DOM for smooth transitions
        
        // Avatar switch interval (5 seconds for better viewing)
        this.avatarSwitchInterval = 5000;
        
        // Initialize
        this.init();
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    init() {
        // Preload first batch of images
        this.preloadImages();
        
        // Create initial avatar elements
        this.createAvatarElements();
        
        // Start countdown
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
        
        // Start avatar transitions
        setTimeout(() => this.startAvatarTransitions(), 1000);
    }
    
    preloadImages() {
        // Preload first 10 images for smooth start
        const preloadCount = Math.min(10, this.avatars.length);
        for (let i = 0; i < preloadCount; i++) {
            const img = new Image();
            img.src = this.baseUrl + this.avatars[i];
        }
    }
    
    createAvatarElements() {
        // Create initial avatar divs
        for (let i = 0; i < this.maxAvatars; i++) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'avatar';
            avatarDiv.id = `avatar-${i}`;
            this.elements.avatarLayer.appendChild(avatarDiv);
            this.avatarElements.push(avatarDiv);
        }
        
        // Set first avatar as active
        const firstAvatar = this.avatarElements[0];
        firstAvatar.style.backgroundImage = `url('${this.baseUrl}${this.avatars[0]}')`;
        firstAvatar.classList.add('active');
        
        // Preload next avatar
        const secondAvatar = this.avatarElements[1];
        secondAvatar.style.backgroundImage = `url('${this.baseUrl}${this.avatars[1]}')`;
    }
    
    updateCountdown() {
        const now = new Date();
        const timeRemaining = this.targetDate - now;
        
        if (timeRemaining <= 0) {
            this.handleCountdownComplete();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Update display with padding
        this.elements.days.textContent = String(days).padStart(2, '0');
        this.elements.hours.textContent = String(hours).padStart(2, '0');
        this.elements.minutes.textContent = String(minutes).padStart(2, '0');
        this.elements.seconds.textContent = String(seconds).padStart(2, '0');
        
        // Update progress bar
        this.updateProgress(now);
    }
    
    updateProgress(currentDate) {
        const totalDuration = this.targetDate - this.startDate;
        const elapsed = currentDate - this.startDate;
        const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
        
        this.elements.progress.style.width = `${progressPercent}%`;
        this.elements.progressText.textContent = `${progressPercent.toFixed(1)}% Complete`;
    }
    
    startAvatarTransitions() {
        setInterval(() => {
            this.transitionToNextAvatar();
        }, this.avatarSwitchInterval);
    }
    
    transitionToNextAvatar() {
        // Get current and next indices
        const currentIndex = this.currentAvatarIndex;
        const nextIndex = (this.currentAvatarIndex + 1) % this.avatars.length;
        
        // Get current active element
        const activeElement = this.avatarElements.find(el => el.classList.contains('active'));
        const inactiveElement = this.avatarElements.find(el => !el.classList.contains('active'));
        
        // Preload next avatar
        const nextNextIndex = (nextIndex + 1) % this.avatars.length;
        const preloadImg = new Image();
        preloadImg.src = this.baseUrl + this.avatars[nextNextIndex];
        
        // Add transition classes
        activeElement.classList.add('leaving');
        activeElement.classList.remove('active');
        
        // Set up next avatar
        inactiveElement.style.backgroundImage = `url('${this.baseUrl}${this.avatars[nextIndex]}')`;
        inactiveElement.classList.add('entering');
        
        // Trigger transition
        setTimeout(() => {
            inactiveElement.classList.add('active');
            inactiveElement.classList.remove('entering');
        }, 50);
        
        // Clean up after transition
        setTimeout(() => {
            activeElement.classList.remove('leaving');
            // Preload upcoming avatar
            activeElement.style.backgroundImage = `url('${this.baseUrl}${this.avatars[nextNextIndex]}')`;
        }, 2500);
        
        // Update index
        this.currentAvatarIndex = nextIndex;
    }
    
    handleCountdownComplete() {
        // Display completion message
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
        
        this.elements.progress.style.width = '100%';
        this.elements.progressText.textContent = 'Value Achieved!';
        
        // Add celebration effect
        this.celebrate();
    }
    
    celebrate() {
        // Rapid avatar switching celebration
        let switches = 0;
        const celebrationInterval = setInterval(() => {
            this.transitionToNextAvatar();
            switches++;
            if (switches >= 20) {
                clearInterval(celebrationInterval);
            }
        }, 300);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BroVerseCountdown();
});