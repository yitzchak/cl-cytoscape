import {
  ISerializers,
  WidgetModel,
  WidgetView,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import cytoscape from 'cytoscape';
// @ts-ignore
import edgehandles from 'cytoscape-edgehandles';

cytoscape.use(edgehandles);


export class EdgeHandlesModel extends WidgetModel {

  defaults() {
    return {
      ...super.defaults(),
      preview: true,
      hover_delay: 150,
      handle_nodes: 'node',
      snap: false,
      snap_threshold: 50,
      snap_frequency: 15,
      no_edge_events_in_draw: false,
      disable_browser_gestures: true,
      handle_in_draw_mode: false,
      node_loop_offset: -50,
      draw_mode: false,
    }
  }

  static serializers: ISerializers = {
    ...WidgetModel.serializers,
  };

  static model_name = 'EdgeHandlesModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'EdgeHandlesView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;

}


export class EdgeHandlesView extends WidgetView {
  cytoscape_obj: any;
  edgehandles: any = null;

  constructor(params: any) {
    super({
      model: params.model,
      options: params.options,
    });

    this.cytoscape_obj = this.options.cytoscape_obj;

    this.on('remove', () => {
      if (this.edgehandles) {
        this.edgehandles.destroy();
        this.edgehandles = null;
      }
    });
  }

  createEdgeHandles() {
    this.edgehandles = this.cytoscape_obj.edgehandles({
      preview: this.model.get('preview'),
      hoverDelay: this.model.get('hover_delay'),
      handleNodes: this.model.get('handle_nodes'),
      snap: this.model.get('snap'),
      snapThreshold: this.model.get('snap_threshold'),
      snapFrequency: this.model.get('snap_frequency'),
      noEdgeEventsInDraw: this.model.get('no_edge_events_in_draw'),
      disableBrowserGestures: this.model.get('disable_browser_gestures'),
      // handlePosition: function( node: any ){
      //   return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      // },
      handleInDrawMode: this.model.get('handle_in_draw_mode'),
      // edgeType: function( sourceNode: any, targetNode: any ){
      //   return 'flat';
      // },
      // loopAllowed: function( node: any ){
      //   return true;
      // },
      nodeLoopOffset: this.model.get('node_loop_offset'),
      // nodeParams: function( sourceNode, targetNode ){
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
      //   return {};
      // },
      // edgeParams: function( sourceNode, targetNode, i ){
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
      //   return {};
      // },
      // ghostEdgeParams: function(){
        // return element object to be passed to cy.add() for the ghost edge
        // (default classes are always added for you)
      //   return {};
      // },
      // show: function( sourceNode ){
        // fired when handle is shown
      // },
      // hide: function( sourceNode ){
        // fired when the handle is hidden
      // },
      // start: function( sourceNode ){
        // fired when edgehandles interaction starts (drag on handle)
      // },
      // complete: function( sourceNode, targetNode, addedEles ){
        // fired when edgehandles is done and elements are added
      // },
      // stop: function( sourceNode ){
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      // },
      // cancel: function( sourceNode, cancelledTargets ){
        // fired when edgehandles are cancelled (incomplete gesture)
      // },
      // hoverover: function( sourceNode, targetNode ){
        // fired when a target is hovered
      // },
      // hoverout: function( sourceNode, targetNode ){
        // fired when a target isn't hovered anymore
      // },
      // previewon: function( sourceNode, targetNode, previewEles ){
        // fired when preview is shown
      // },
      // previewoff: function( sourceNode, targetNode, previewEles ){
        // fired when preview is hidden
      // },
      // drawon: function(){
        // fired when draw mode enabled
      // },
      // drawoff: function(){
        // fired when draw mode disabled
    });

    this.setDrawMode();
  }

  handle_custom_message(content: any): void {
    if (this.edgehandles) {
      console.log(content);
      switch (content.do) {
        case 'start':
          console.log('start', content.source);
          this.edgehandles.start(this.cytoscape_obj.getElementById(content.source));
          break;
        case 'stop':
          this.edgehandles.stop();
          break;
        case 'hide':
          this.edgehandles.hide();
          break;
      }
    }
  }

  setDrawMode() {
    if (!this.edgehandles) return;

    if (this.model.get('draw_mode')) {
      this.edgehandles.enableDrawMode();
    } else {
      this.edgehandles.disableDrawMode();
    }
  }

  render() {
    if (!this.cytoscape_obj) {
      this.el.innerHTML = "Cytoscape edge handles only usable in a Cytoscape widget.";
    } else {
      this.createEdgeHandles();

      this.model.on_some_change([
        'preview',
        'hover_delay',
        'handle_nodes',
        'snap',
        'snap_threshold',
        'snap_frequency',
        'no_edge_events_in_draw',
        'disable_browser_gestures',
        'handle_in_draw_mode',
        'node_loop_offset'
      ], this.createEdgeHandles.bind(this), this);

      this.model.on('change:draw_mode', this.setDrawMode.bind(this), this);

      this.model.on('msg:custom', this.handle_custom_message.bind(this));
    }
  }
}

