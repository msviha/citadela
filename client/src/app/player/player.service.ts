import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  indicators = [
    {
      tooltip: 'Crown',
      show: false,
      iconClass: 'fas fa-crown fa-stack-1x amber-text',
      bgIconClass: 'fa-circle fa-stack-2x white-text',
      displayValue: '',
      active: false
    },
    {
      tooltip: 'Hero',
      show: true,
      iconClass: 'fas fa-hat-wizard fa-stack-1x',
      bgIconClass: 'fa-circle fa-stack-2x lime-text',
      displayValue: '?',
      active: false
    },
    {
      tooltip: 'Buildings',
      show: true,
      iconClass: 'fas fa-university fa-stack-1x',
      bgIconClass: 'fa-circle fa-stack-2x blue-grey-text',
      displayValue: 0,
      active: false
    },
    {
      tooltip: 'Cards',
      show: true,
      iconClass: 'far fa-images fa-rotate-270 fa-stack-1x',
      bgIconClass: 'fa-circle fa-stack-2x red-text',
      displayValue: 0,
      active: false
    },
    {
      tooltip: 'Points',
      show: true,
      iconClass: 'fas fa-dice fa-stack-1x',
      bgIconClass: 'fa-circle fa-stack-2x blue-text',
      displayValue: 0,
      active: false
    },
    {
      tooltip: 'Coins',
      show: true,
      iconClass: 'fas fa-dollar-sign fa-stack-1x',
      bgIconClass: 'fa-circle fa-stack-2x amber-text',
      displayValue: 0,
      active: false
    }
  ];

  constructor() {
  }

  setTabState(item:any) {
    for (const indicator of this.indicators) {
      indicator.active = item === indicator && !indicator.active;
    }
  }
}
