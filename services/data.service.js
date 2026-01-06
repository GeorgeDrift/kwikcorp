
import { pool } from '../db.js';

const INITIAL_DATA = {
  mission: "To revolutionize global trade and logistics through cutting-edge digital infrastructure that empowers businesses to scale faster and smarter.",
  vision: "To become the world's most trusted partner in digital commerce and logistics innovation.",
  story: "KwikCorp began with a simple idea: that commerce should be borderless and frictionless. We leverage advanced AI and logistics networks to bridge the gap between local businesses and global markets.\n\nToday, KwikCorp stands at the forefront of the digital revolution, providing the tools and infrastructure needed for the next generation of global enterprises.",
  images: {
    hero: "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/603059749_122094201393187259_5574990911414127814_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&oh=00_AfozxBJ-mrF2SfrURWYOhjc3iSN1XmfInVk1E9C2D5z50Q&oe=69618A02",
    about: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/597929091_122111674929110076_2631308179868286230_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEhVpdv_qC6Ln4XLpmAc17j220IMLzEDWXbbQgwvMQNZaOuLQEVne9nYIySIGc0xTTt0kRa-XVHLiQWsEZF0H9l&_nc_ohc=fKnq0Y4M1wYQ7kNvwHI1RW6&_nc_oc=Adn7MRAgJ6oeG-xNBsTeaWMUZ_f-y-Hkgrb90K-RhGntGdAP1lbzaI9tGg5SGHV4R-E&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=gctzsYlFf7Qq5LxBPsXgpw&oh=00_AfoXmUdB75lpfk8oofLgX1R-A5xbqagMSsON1T13epDTYw&oe=6962FFF7",
    logo: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-1/603906831_122112186855110076_4671615196328986640_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeFcQ6u2oNVvDjzK00lyVDOlkVwnLkR8UVaRXCcuRHxRVuWqPg4dev2bNTnIV1hVKbyFxsTO1erYQ41ExtWDeMOA&_nc_ohc=a747Sr1UE6MQ7kNvwGB7OmF&_nc_oc=AdmYjvTI-PEEhp4tUiQa4yk-aUyUZgVVkoZI7JYdv-rVzS_Ui0tDSaPy5z5rDVeVX3Y&_nc_zt=24&_nc_ht=scontent.fllw1-1.fna&_nc_gid=o8diduZ4ssfRqiAWRoh_Cg&oh=00_AfrHzcYu1VQc4oDCzaODk9IPX1GG9pB8TURlDx9j4p65jw&oe=6963174A",
    sectionBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
};

export const DataService = {
  async initDb() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        mission TEXT,
        vision TEXT,
        story TEXT,
        hero_image TEXT,
        about_image TEXT,
        logo_url TEXT,
        section_bg TEXT
      );
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        title TEXT,
        short_description TEXT,
        who_its_for TEXT,
        key_benefits TEXT[],
        icon TEXT,
        sort_order INTEGER
      );
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        url TEXT,
        title TEXT,
        category TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS units (
        id SERIAL PRIMARY KEY,
        name TEXT
      );
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        userAgent TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure content always exists and is up to date with code defaults for this "Fix"
    const count = await pool.query('SELECT count(*) FROM site_content');
    if (count.rows[0].count === '0') {
      await pool.query(
        'INSERT INTO site_content (id, mission, vision, story, hero_image, about_image, logo_url, section_bg) VALUES (1, $1, $2, $3, $4, $5, $6, $7)',
        [INITIAL_DATA.mission, INITIAL_DATA.vision, INITIAL_DATA.story, INITIAL_DATA.images.hero, INITIAL_DATA.images.about, INITIAL_DATA.images.logo, INITIAL_DATA.images.sectionBg]
      );
    } else {
      // Enforce branding update on restart
      await pool.query(
        'UPDATE site_content SET hero_image=$1, about_image=$2, logo_url=$3 WHERE id=1',
        [INITIAL_DATA.images.hero, INITIAL_DATA.images.about, INITIAL_DATA.images.logo]
      );
    }

    // Seed Gallery (ensure all core images exist with stories)
    await pool.query('ALTER TABLE gallery ADD COLUMN IF NOT EXISTS description TEXT');

    const galleryImages = [
      {
        url: 'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/599941363_25317666681234294_7807654653635817820_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFYiaICKJgke4AfPFZKJ-oe_OfHr9oi3N7858ev2iLc8TVNSnyyMD3hrra3pJIJz66Hx1aINY_lNpejyloHmh5&_nc_ohc=uPzXVWyMdycQ7kNvwFjunsj&_nc_oc=AdnbxOrfcbnmJMwHeKD5NW-LAmGA_dQ8E-0TTiknw0YjhsIeYYAQ-MYz29C8kELOqTg&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=UtrmwabOAwcguHohPXTSWA&oh=00_AfrdE80Xolkr4qlNo0j0fP_4mcs54gmYxBs3dAioWiYMyw&oe=69632ABE',
        title: 'Field Agent Network',
        category: 'Field Agents',
        description: 'Our dedicated field agents provide hands-on training and support to farmers, ensuring technology adoption and maximizing crop yields.'
      },
      {
        url: 'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/598581670_1300691878761669_8165048595316856216_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGEB-azX497qK29DCBjQrORm8Ngcal-8hybw2BxqX7yHKsEY0FFz-EWuMKl18f4SwgL6b7z-bvSlb-xZFa2EQOx&_nc_ohc=xDIdpLkH0zAQ7kNvwFi8xEs&_nc_oc=Adlb99anDjrcViIuGSneU-kuwvFAzZKtWYbbDek_qs3A8ME8VEO7T06HKJCCGeev5BA&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=vBBdAbbNPPjikfXKSLzdKA&oh=00_AfobGND-Apl7HArFD0HByEw9JrzFqnsUgjCAX3FYn5lnmA&oe=69632792',
        title: 'Sustainable Growth',
        category: 'Field Agents',
        description: 'Empowering rural communities through decentralized knowledge sharing and sustainable agricultural practices monitored by our field teams.'
      },
      {
        url: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/601818029_122112188031110076_2947405286352830443_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFHnxr8NpYwZfIpMHHwJ3fcXavLmijDSf5dq8uaKMNJ_g6nn3Ipnh-rYasJyHRHRWskry41zNyH1NdvV8D4vheT&_nc_ohc=MNY9D-pTYOUQ7kNvwG3wiCR&_nc_oc=AdkVtTixzrYgdQBo8ANcDFpUA3CqDWXWglnAhGZM_YljsniocYs_zHa_PVgvLZdrZYw&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=KYzzKij8AzmyvotYbcdtpA&oh=00_Afp5x8VUIctUDmCJw6LvfFvxEn8BT1sfgY58oKMhiSDW8A&oe=696312CB",
        title: "Tech Integration",
        category: "App",
        description: 'Launching our latest mobile platform that connects farmers directly with markets, reducing waste and increasing profit margins across the region.'
      },
      {
        url: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/605126390_122112187221110076_1581533830335102423_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGDaDRlH8S74zNFLcyj2IHlKq38m-XSNBQqrfyb5dI0FJ31_XfQtOfzyjnOKfuQbGrOovWjmvTxPcFYoiKu3ZT5&_nc_ohc=V6uCISatOJsQ7kNvwFq7QhX&_nc_oc=Adl6Rqwja1XKPKvrCA5dFdCHWfp_o7_5erIf4-dzvzKQxTatBjyNyhdJx7-JtQtxCBE&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=o8diduZ4ssfRqiAWRoh_Cg&oh=00_AfpRsRTYfIiLuuqAL25-rLyorekf_jnDiIlBfrJkgE4Vvw&oe=69631F69",
        title: "Smart Farming",
        category: "Innovation",
        description: 'Deploying IOT sensors that monitor soil health in real-time. This technology allows for precision farming, saving water and nutrients.'
      }
    ];

    for (const img of galleryImages) {
      const existing = await pool.query('SELECT id FROM gallery WHERE url = $1', [img.url]);
      if (existing.rowCount === 0) {
        await pool.query('INSERT INTO gallery (url, title, category, description) VALUES ($1, $2, $3, $4)', [img.url, img.title, img.category, img.description]);
      } else {
        await pool.query('UPDATE gallery SET description = $1 WHERE url = $2 AND (description IS NULL OR description = \'\')', [img.description, img.url]);
      }
    }
  },

  async getSiteContent() {
    const content = await pool.query('SELECT * FROM site_content LIMIT 1');
    const services = await pool.query('SELECT * FROM services ORDER BY sort_order');
    const gallery = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');

    const row = content.rows[0];
    return {
      mission: row.mission,
      vision: row.vision,
      story: row.story,
      images: {
        hero: row.hero_image,
        about: row.about_image,
        logo: row.logo_url,
        sectionBg: row.section_bg
      },
      services: services.rows.map(s => ({
        id: s.id,
        title: s.title,
        shortDescription: s.short_description,
        whoItsFor: s.who_its_for,
        keyBenefits: s.key_benefits,
        icon: s.icon
      })),
      gallery: gallery.rows
    };
  },

  // Granular Site Content Updates
  async updateMission(text) { return pool.query('UPDATE site_content SET mission=$1 WHERE id=1', [text]); },
  async updateVision(text) { return pool.query('UPDATE site_content SET vision=$1 WHERE id=1', [text]); },
  async updateStory(text) { return pool.query('UPDATE site_content SET story=$1 WHERE id=1', [text]); },
  async updateHeroImage(url) { return pool.query('UPDATE site_content SET hero_image=$1 WHERE id=1', [url]); },
  async updateAboutImage(url) { return pool.query('UPDATE site_content SET about_image=$1 WHERE id=1', [url]); },
  async updateLogoUrl(url) { return pool.query('UPDATE site_content SET logo_url=$1 WHERE id=1', [url]); },
  async updateSectionBg(url) { return pool.query('UPDATE site_content SET section_bg=$1 WHERE id=1', [url]); },

  // Service Management
  async addService(s) {
    return pool.query(
      'INSERT INTO services (id, title, short_description, who_its_for, key_benefits, icon, sort_order) VALUES ($1, $2, $3, $4, $5, $6, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM services))',
      [s.id || `service-${Date.now()}`, s.title, s.shortDescription, s.whoItsFor, s.keyBenefits, s.icon]
    );
  },
  async updateService(id, s) {
    return pool.query(
      'UPDATE services SET title=$1, short_description=$2, who_its_for=$3, key_benefits=$4, icon=$5 WHERE id=$6',
      [s.title, s.shortDescription, s.whoItsFor, s.keyBenefits, s.icon, id]
    );
  },
  async deleteService(id) { return pool.query('DELETE FROM services WHERE id=$1', [id]); },

  // Gallery Management
  async addGalleryItem(url, title, category, description) {
    return pool.query('INSERT INTO gallery (url, title, category, description) VALUES ($1, $2, $3, $4)', [url, title, category, description]);
  },
  async deleteGalleryItem(id) { return pool.query('DELETE FROM gallery WHERE id=$1', [id]); },

  async logVisit(userAgent) { return pool.query('INSERT INTO visits (user_agent) VALUES ($1)', [userAgent]); },


  async getAdminStats() {
    const visits = await pool.query('SELECT * FROM visits ORDER BY timestamp DESC LIMIT 100');
    return { visits: visits.rows };
  }
};
