const _ = require('underscore');

const menu = [
  {
    title: 'Series',
    icon: 'series',
    href: '/',
    aliases: ['/series'],
    items: [
      {
        title: 'Add New',
        href: '/add/new'
      },
      {
        title: 'Editor',
        href: '/serieseditor'
      },
      {
        title: 'Season Pass',
        href: '/seasonpass'
      },
      {
        title: 'Import',
        href: '/add/import'
      }
    ]
  },
  {
    title: 'Calendar',
    icon: 'calendar',
    href: '/calendar'
  },
  {
    title: 'Activity',
    icon: 'activity',
    href: '/activity/history',
    notification: 'activity',
    notificationHideActive: true,
    items: [
      {
        title: 'Queue',
        href: '/activity/queue',
        notification: 'queue'
      },
      {
        title: 'Blacklist',
        href: '/activity/blacklist'
      }
    ]
  },
  {
    title: 'Wanted',
    icon: 'wanted',
    href: '/wanted/missing',
    items: [
      {
        title: 'Cutoff Unmet',
        href: '/wanted/cutoff'
      }
    ]
  },
  {
    title: 'Settings',
    icon: 'settings',
    href: '/settings/ui',
    items: [
      {
        title: 'Media Management',
        href: '/settings/mediamanagement'
      },
      {
        title: 'Profiles',
        href: '/settings/profiles'
      },
      {
        title: 'Quality',
        href: '/settings/quality'
      },
      {
        title: 'Indexers',
        href: '/settings/indexers'
      },
      {
        title: 'Download Clients',
        href: '/settings/downloadclient'
      },
      {
        title: 'Connect',
        href: '/settings/connect'
      },
      {
        title: 'Metadata',
        href: '/settings/metadata'
      },
      {
        title: 'General',
        href: '/settings/general'
      }
    ]
  },
  {
    title: 'System',
    icon: 'system',
    href: '/system/status',
    notification: 'health',
    items: [
      {
        title: 'Tasks',
        href: '/system/tasks'
      },
      {
        title: 'Backup',
        href: '/system/backup'
      },
      {
        title: 'Updates',
        href: '/system/updates'
      },
      {
        title: 'Logs',
        href: '/system/logs'
      }
    ]
  }
];

const urls = {};

function addMenuUrls(items) {
  _.each(items, (item) => {
    urls[item.href] = item;

    _.each(item.aliases, (alias) => {
      urls[alias] = item;
    });

    if (item.items) {
      addMenuUrls(item.items);
    }
  });
}

addMenuUrls(menu);

function findByHref(href) {
  if (!href) {
    return {};
  }

  if (window.Sonarr.UrlBase) {
    href = href.substring(window.Sonarr.UrlBase.length);
  }

  const item = urls[href];
  if (item) {
    return item;
  }

  const parent = href.replace(/\/[^\/]*$[^\/]*$/, '');
  return findByHref(parent);
}

const menuItems = {
  menu,
  findByHref
};

module.exports = menuItems;
