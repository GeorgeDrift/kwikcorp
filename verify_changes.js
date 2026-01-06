import { DataService } from './services/data.service.js';
import { pool } from './db.js';

async function verify() {
    try {
        console.log('Initializing DB (should update branding)...');
        await DataService.initDb();

        console.log('Fetching content...');
        const content = await DataService.getSiteContent();

        console.log('Mission start:', content.mission.substring(0, 50) + '...');
        console.log('Logo:', content.images.logo);

        if (content.mission.includes('commerce') || content.story.includes('KwikCorp')) {
            console.log('SUCCESS: Branding updated to KwikCorp.');
        } else {
            console.error('FAILURE: Branding not updated.');
        }

        // Test adding service
        console.log('Testing Add Service...');
        const testId = `test-service-${Date.now()}`;
        await DataService.addService({
            id: testId,
            title: 'Test Service',
            shortDescription: 'Test Desc',
            whoItsFor: 'Testers',
            keyBenefits: ['Testing'],
            icon: 'Zap'
        });

        // Check if added
        const freshContent = await DataService.getSiteContent();
        const found = freshContent.services.find(s => s.title === 'Test Service');
        if (found) {
            console.log('SUCCESS: Service added dynamically.');
            // Clean up
            await DataService.deleteService(found.id);
        } else {
            console.error('FAILURE: Service not added.');
        }

    } catch (err) {
        console.error('Verification failed:', err);
    } finally {
        await pool.end();
    }
}

verify();
