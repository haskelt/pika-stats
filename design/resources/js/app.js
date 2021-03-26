{{ project.js_copyright_notice }}

import data_manager from '{{project.site_path}}/js/data/data_manager.js?v={{project.version}}';

data_manager.initialize();
data_manager.update();
