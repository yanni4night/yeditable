module.exports=function(grunt){
        
        grunt.initConfig({
            pkg:grunt.file.readJSON('package.json'),
            uglify:{
                build:{
                    src:"./jquery.yy.editable.js",
                    dest:"./jquery.yy.editable.<%=pkg.version%>.min.js"
                    
                    }
                },
             jshint:{
                 
                 foo:{
                     src:"./jquery.yy.editable.js"
                     }
                 
                 }
            
            });

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-jshint');

        grunt.registerTask('default',['jshint','uglify:build']);
    
    };
