(asdf:defsystem #:cl-cytoscape
  :description "A cytoscape for Common Lisp."
  :version "0.1.96"
  :author "Tarn W. Burton"
  :license "MIT"
  :depends-on
    (:common-lisp-jupyter
     :jsown)
  :components
    ((:module src
      :serial t
      :components
        ((:file "packages")
         (:file "version")
         (:file "edge-handles")
         (:file "context-menu")
         (:file "cytoscape")))))
