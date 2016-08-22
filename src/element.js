// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// @author Mohit Cheppudira
//
// ## Description
//
// This file implements a generic base class for VexFlow, with implementations
// of general functions and properties that can be inherited by all VexFlow elements.

import { Vex } from './vex';
import { Registry } from './registry';

export class Element {
  static newID() { return 'auto' + (Element.ID++); }

  constructor() {
    this.attrs = {
      id: Element.newID(),
      el: null,
      type: 'Base',
    };

    this.boundingBox = null;
    this.context = null;
    this.rendered = false;
    if (Registry.getDefaultRegistry()) {
      Registry.getDefaultRegistry().register(this);
    }
  }

  onRegister(registry) { this.registry = registry; return this; }
  isRendered() { return this.rendered; }
  setRendered(rendered = true) { this.rendered = rendered; return this; }

  getAttributes() { return this.attrs; }
  getAttribute(name) { return this.attrs[name]; }
  setAttribute(name, value) {
    const id = this.attrs.id;
    this.attrs[name] = value;
    if (this.registry) {
      // Register with old id to support id changes.
      this.registry.onUpdate(id);
    }
    return this;
  }

  getContext() { return this.context; }
  setContext(context) { this.context = context; return this; }
  getBoundingBox() { return this.boundingBox; }

  // Validators
  checkContext() {
    if (!this.context) {
      throw new Vex.RERR('NoContext', 'No rendering context attached to instance');
    }
    return this.context;
  }
}

Element.ID = 1000;
