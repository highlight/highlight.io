export type PricingDetails = {
  [key: string]: {
    name: string;
    key: number;
    items: {
      publicSessionSharing: {
        key: 0;
        name: 'Public session sharing';
        value: boolean;
      };
      customDataExport: {
        key: 1;
        name: 'Custom data export';
        value: boolean;
      };
      enhancedUserProperties: {
        key: 2;
        name: 'Enhanced user properties';
        value: boolean;
      };
      sessionErrorCommenting: {
        key: 3;
        name: 'Session / error commenting';
        value: boolean;
      };
    };
  };
};

export const BasicDetails: PricingDetails = {
  features: {
    name: 'Features',
    key: 0,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: false,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: false,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
  teamManagement: {
    name: 'Team Management',
    key: 1,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Role-based access control',
        value: false,
      },
      customDataExport: {
        key: 1,
        name: 'Single sign-on',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Two-factor authentication',
        value: false,
      },
    },
  },
  support: {
    name: 'Support',
    key: 2,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Email',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Intercom',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Slack Connect',
        value: false,
      },
      sessionErrorCommenting: {
        key: 3,
        name: '24x7 support with SLAs',
        value: false,
      },
    },
  },
};

export const EssentialsDetails: PricingDetails = {
  features: {
    name: 'Features',
    key: 0,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: false,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: false,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
  teamManagement: {
    name: 'Team Management',
    key: 1,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Role-based access control',
        value: false,
      },
      customDataExport: {
        key: 1,
        name: 'Single sign-on',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Two-factor authentication',
        value: false,
      },
    },
  },
  support: {
    name: 'Support',
    key: 2,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Email',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Intercom',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Slack Connect',
        value: false,
      },
      sessionErrorCommenting: {
        key: 3,
        name: '24x7 support with SLAs',
        value: false,
      },
    },
  },
};

export const StartupDetails: PricingDetails = {
  features: {
    name: 'Features',
    key: 0,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: false,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
  teamManagement: {
    name: 'Team Management',
    key: 1,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Role-based access control',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Single sign-on',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Two-factor authentication',
        value: true,
      },
    },
  },
  support: {
    name: 'Support',
    key: 2,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Email',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Intercom',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Slack Connect',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: '24x7 support with SLAs',
        value: false,
      },
    },
  },
};

export const EnterpriseDetails: PricingDetails = {
  features: {
    name: 'Features',
    key: 0,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Public session sharing',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Custom data export',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Enhanced user properties',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: 'Session / error commenting',
        value: true,
      },
    },
  },
  teamManagement: {
    name: 'Team Management',
    key: 1,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Role-based access control',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Single sign-on',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Two-factor authentication',
        value: true,
      },
    },
  },
  support: {
    name: 'Support',
    key: 2,
    items: {
      publicSessionSharing: {
        key: 0,
        name: 'Email',
        value: true,
      },
      customDataExport: {
        key: 1,
        name: 'Intercom',
        value: true,
      },
      enhancedUserProperties: {
        key: 2,
        name: 'Slack Connect',
        value: true,
      },
      sessionErrorCommenting: {
        key: 3,
        name: '24x7 support with SLAs',
        value: true,
      },
    },
  },
};
