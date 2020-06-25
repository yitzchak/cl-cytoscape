(in-package :cytoscape)

(defclass edge-handles (jupyter-widgets:widget)
  ((preview
     :accessor preview
     :initarg :preview
     :initform 100
     :documentation "whether to show added edges preview before releasing selection"
     :trait :bool)
   (hover-delay
     :accessor hover-delay
     :initarg :hover-delay
     :initform "node"
     :documentation "time spent hovering over a target node before it is considered selected"
     :trait :int)
   (handle-nodes
     :accessor handle-nodes
     :initarg :handle-nodes
     :initform "node"
     :documentation "selector/filter function for whether edges can be made from a given node"
     :trait :unicode)
   (snap
     :accessor snap
     :initarg :snap
     :initform nil
     :documentation "when enabled, the edge can be drawn by just moving close to a target node"
     :trait :bool)
   (snap-threshold
     :accessor snap-threshold
     :initarg :snap-threshold
     :initform 50
     :documentation "the target node must be less than or equal to this many pixels away from the cursor/finger"
     :trait :int)
   (snap-frequency
     :accessor snap-frequency
     :initarg :snap-frequency
     :initform 15
     :documentation "the number of times per second (Hz) that snap checks done (lower is less expensive)"
     :trait :int)
   (no-edge-events-in-draw
     :accessor no-edge-events-in-draw
     :initarg :no-edge-events-in-draw
     :initform nil
     :documentation "set events:no to edges during draws, prevents mouseouts on compounds"
     :trait :bool)
   (disable-browser-gestures
     :accessor disable-browser-gestures
     :initarg :disable-browser-gestures
     :initform t
     :documentation "during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom"
     :trait :bool)
   (handle-in-draw-mode
     :accessor handle-in-draw-mode
     :initarg :handle-in-draw-mode
     :initform nil
     :documentation "whether to show the handle in draw mode"
     :trait :bool)
   (node-loop-offset
     :accessor node-loop-offset
     :initarg :node-loop-offset
     :initform -50
     :documentation "offset for edgeType: 'node' loops"
     :trait :int)
   (draw-mode
     :accessor draw-mode
     :initarg :draw-mode
     :initform nil
     :documentation "Will selecting a node add an edge"
     :trait :bool))
  (:metaclass jupyter-widgets:trait-metaclass)
  (:documentation "Edge handles for cytoscape.")
  (:default-initargs
    :%model-name "EdgeHandlesModel"
    :%model-module +module-name+
    :%model-module-version +module-version+
    :%view-name "EdgeHandlesView"
    :%view-module +module-name+
    :%view-module-version +module-version+))

(jupyter-widgets:register-widget edge-handles)

(defun start-edge (instance source)
  (jupyter-widgets:send-custom instance
                               (jupyter:json-new-obj
                                 ("do" "start")
                                 ("source" source))))


