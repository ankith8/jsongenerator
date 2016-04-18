var mongoose = require('mongoose');
const jsf = require('json-schema-faker');
var schema = require('./jsonSchema');
var _ = require('underscore');

mongoose.connect('mongodb://localhost/your_db_test');

var projectsIds = [];
var sprintIds = [];
var memberIds = [];
var listIds = [];
var storiesIds = [];
var BacklogBuglistIds = [];
var records = 100;
var group = ['inProgress','completed'];
var listNames = ['backlogs', 'inprogress', 'done','forreview','releasable','archive'];
var colors = ['#ff0000', '#00cc00', '#0000ff','#ff6600','#990033','#ffff00'];
var initials = ['sh', 'vi', 'ak','su','ab','go'];

for(i=0;i<records;i++) {
  projectsIds.push(mongoose.Types.ObjectId());
  sprintIds.push(mongoose.Types.ObjectId());
  memberIds.push(mongoose.Types.ObjectId());
  listIds.push(mongoose.Types.ObjectId());
  storiesIds.push(mongoose.Types.ObjectId());
};

jsf.format('member',function(gen,schema) {
  return memberIds[_.random(0,records)];
});

jsf.format('project',function(gen,schema) {
  return projectsIds[_.random(0,records)];
});

jsf.format('sprint',function(gen,schema) {
  return sprintIds[_.random(0,records)];
});

jsf.format('story',function(gen,schema) {
  return storiesIds[_.random(0,records)];
});

jsf.format('bbList',function(gen,schema) {
  return mongoose.Types.ObjectId();
});

jsf.format('list',function(gen,schema) {
  return  listIds[_.random(0,records)];
});

jsf.format('listName',function(gen,schema) {
  return listNames[_.random(0,listNames.length-1)];
});

jsf.format('group',function(gen,schema) {
  return group[_.random(0,group.length-1)];
});

jsf.format('release',function(gen,schema) {
  return mongoose.Types.ObjectId();
});

jsf.format('label',function(gen,schema) {
  return mongoose.Types.ObjectId();
});

jsf.format('id',function(gen,schema) {
  return mongoose.Types.ObjectId();
});

jsf.format('color',function(gen,schema) {
  return colors[_.random(0, colors.length-1)];
});

jsf.format('initial',function(gen,schema) {
  return initials[_.random(0, initials.length-1)];
});

jsf.format('imageUrl',function(gen,schema) {
  return 'http://placehold.it/150x150';
});

jsf.format('password',function(gen,schema) {
  return "password";
});

jsf.format('file',function(gen,schema) {
  var files = ['attachments/abc.pdf', 'attachments/buglist.txt','attachments/bugs.doc','attachments/photo.png', 'attachments/photo.jpg'];
  return files[_.random(0, files.length-1)];;
});

jsf.format('fileType',function(gen,schema) {
  var files = ['.pdf', '.txt','.png', '.jpg','.doc'];
  return files[_.random(0, files.length-1)];;
});


//************** Projects Schema Start *************************
var projectSchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'project'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    date:{
      type: 'string',
      faker : 'date.recent'
    },
    memberList: {
      type: 'array',
      maxItems: 7,
      minItems: 1,
      items: {
        type: 'string',
        format: 'member'
      },
    },
    release: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            format: 'release'
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          creationDate:{
            type: 'string',
            faker : 'date.past'
          },
          releaseDate:{
            type: 'string',
            faker : 'date.future'
          },
          sprints: {
            type: 'array',
            minItems: 1,
            maxItems: 7,
            items: {
              type: 'string',
              format: 'sprint'
            }
          }
        },
        required: ['_id','sprints','name','description','creationDate','releaseDate']
      }
    }
  },
  required: ['_id','release','name','description','memberList','date']
};
var sprintSchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'project'
    },
    name: {
      type: 'string'
    },
    startDate:{
      type: 'string',
      faker : 'date.past'
    },
    endDate:{
      type: 'string',
      faker : 'date.future'
    },
    description: {
      type: 'string'
    },
    labelTemplate: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items:{
        type:'object',
        properties:{
          _id: {
            type: 'string',
            format: 'label'
          },
          text: {
            type: 'string'
          },
          colorCode: {
            type: 'string',
            format: 'color'
          },
        },
        required: ['text','colorCode','_id']
      }
    },
    list: {
      type: 'array',
      minItems: 1,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          group: {
            type: 'string',
            format:'group'
          },
          listName: {
            type: 'string',
            format:'listName'
          },
          stories: {
            type: 'array',
            minItems: 1,
            maxItems: 5,
            items: {
              type: 'string',
              format: 'story'
            }
          }
        },
        required: ['group','listName','stories']
      }
    }
  },
  required: ['_id','name','startDate','endDate','description','labelTemplate','list']
};
var storySchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'story'
    },
    storyCreatorId: {
      type: 'string',
      format: 'member'
    },
    listId: {
      type: 'string',
      format: 'list'
    },
    heading: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    createdTimeStamp:{
      type: 'string',
      faker : 'date.past'
    },
    lastUpdated:{
      type: 'string',
      faker : 'date.future'
    },
    indicators: {
      type: 'object',
      properties: {
        descriptionStatus:{
          type: 'boolean'
        },
        checklistGroupCount:{
          type: 'integer',
          minimum: 0,
          maximum : 5,
          minimumExclusive: true
        },
        attachmentsCount:{
          type: 'integer',
          minimum: 0,
          maximum : 5,
          minimumExclusive: true
        },
        commentCount:{
          type: 'integer',
          minimum: 0,
          maximum : 5,
          minimumExclusive: true
        }
      },
      required: ['descriptionStatus','checklistGroupCount','attachmentsCount','commentCount']
    },
    attachmentList: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items:{
        type:'object',
        properties:{
          fileName: {
            type: 'string',
            format : 'file'
          },
          timeStamp:{
            type: 'string',
            faker : 'date.past'
          },
          attachmentType: {
            type: 'string',
            format: 'fileType'
          },
          addedByUserName:{
            type: 'string'
          },
          addedByUserId:{
            type: 'string',
            format: 'member'
          },
          path: {
            type: 'string',
            format : 'file'
          }
        },
        required: ['fileName','timeStamp','attachmentType','addedByUserName','addedByUserId','path']
      }
    },
    checklist: {
      type: 'array',
      minItems: 1,
      maxItems: 5,
      items:{
        type:'object',
        properties:{
          checklistHeading: {
            type: 'string',
            format : 'file'
          },
          checkedCount:{
            type: 'integer',
            minimum: 0,
            maximum: 5,
            minimumExclusive: true
          },
          type: 'array',
          minItems: 1,
          maxItems: 5,
          items:{
            type:'object',
              properties:{
                text:{
                  type: 'string'
                },
                checked:{
                  type: 'boolean'
                },
                createdBy:{
                  type: 'string',
                  format: 'member'
                },
                creationDate:{
                  type: 'string',
                  faker : 'date.past'
                },
                creatorName:{
                  type: 'string'
                }
            },
            required: ['text','checked','createdBy','creationDate','creatorName']
          }
        },
        required: ['checklistHeading','checkedCount','items']
      }
    },

    memberList: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items: {
        type: 'string',
        format: 'member'
      }
    },
    labelList: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items: {
        type: 'string',
        format: 'label'
      }
    }
  },
  required: ['_id','listId','storyCreatorId','storyStatus','heading','description','createdTimeStamp','lastUpdated','indicators','attachmentList','checklist','memberList','labelList']
};
var activitySchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'bbList'
    },
    action: {
      type: 'string'
    },
    projectID: {
      type: 'string',
      format: 'project'
    },
    date: {
      type: 'string',
      faker : 'date.past'
    },
    userCreator: {
      fullName: {
        type: 'string'
      },
      _id: {
        type: 'string',
        format: 'member'
      },
    },
    object: {
      name: {
        type: 'string'
      },
      kind: {
        type: 'string'
      },
      _id: {
        type: 'string',
        format:'id'
      }
    },
    target: {
      name: {
        type: 'string'
      },
      kind: {
        type: 'string'
      },
      _id: {
        type: 'string',
        format:'id'
      }
    }
  },
  required: ['_id','action','projectID','date','userCreator','object','target']
};
var userSchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'member'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    createdDate:{
      type: 'string',
      faker : 'date.past'
    },
    updatedDate:{
      type: 'string',
      faker : 'date.future'
    },
    password: {
      type: 'string',
      format : 'password'
    },
    email: {
      type: 'string',
      format: 'email',
      faker: 'internet.email'
    },
    initials:{
      type: 'string',
      format: 'initial'
    },
    imageUrl:{
      type:'string',
      format : 'imageUrl'
    },
    projects: {
      type: 'array',
      minItems: 2,
      maxItems: 7,
      items: {
        type: 'string',
        format: 'project'
      }
    }
  },
  required: ['_id','firstName','lastName','createdDate','updatedDate','password','email','initials','imageUrl','projects']
};
var backlogBuglistSchema = {
  type:'object',
  properties: {
    _id: {
      type: 'string',
      format: 'bbList'
    },
    projectId: {
      type: 'string',
      format: 'project'
    },
    type: 'object',
    backlogs: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items: {
        type: 'string',
        format: 'story'
      }
    },
    type: 'object',
    buglist: {
      type: 'array',
      minItems: 1,
      maxItems: 7,
      items: {
        type: 'string',
        format: 'story'
      }
    }
  },
  required: ['_id','projectId','backlogs','buglist']
};


//***************** Saving tne Models ibto collections *****************

// Looping Hell Yeh !

var projectPromises = [];
for(i=0;i<records;i++) {

  // Save Projects
  var proj = jsf(projectSchema);
  proj._id = projectsIds[i];
  release = _.uniq(_.pick(proj,'release').release);
  var projModel = schema.projectModel(_.omit(proj,'release'));
  release.forEach(function(sprint) {
    projModel.release.addToSet(sprint);
  });

  mem = _.uniq(_.pick(proj,'memberList').memberList);
  projModel = schema.projectModel(_.omit(proj,'memberList'));
  mem.forEach(function(member) {
    projModel.memberList.addToSet(member);
  });

  var projectPromise = new Promise(function(resolve,reject){
    projModel.save(function(err,document) {
        if(!err) {
          resolve();
        }
    });
  });

   projectPromises.push(projectPromise);

  // Save Users
  var usrs = jsf(userSchema);
  usrs._id = memberIds[i];
  var proj = _.uniq(_.pick(usrs,'project').projects);
  var userModel = schema.userModel(_.omit(usrs,'projects'));
  var userPromise = new Promise(function(resolve,reject) {
    userModel.save(function(err,document) {
    // console.log("from save",document);
    if(!err)
      resolve();
  });
});

projectPromises.push(userPromise);

  // Save Stories
  var stor = jsf(storySchema);
  stor._id = storiesIds[i];
  var stoModel = schema.storyModal(stor);
  stoModel.save(function(err,document) {
    // console.log("from save",document);
  });

  // Save Sprints
  var spri = jsf(sprintSchema);
  spri._id = sprintIds[i];
  var sprModel = schema.sprintModel(spri);
  sprModel.save(function(err,document) {
    // console.log("from save",document);
  });

  // Save BacklogBuglist
  var back = jsf(backlogBuglistSchema);
  // back._id = BacklogBuglistIds[i];
  var bacModel = schema.backlogBuglistModel(back);
  bacModel.save(function(err,document) {
    // console.log("from save",document);
  });

  // Save Activity
  var acti = jsf(activitySchema);
  var actModel = schema.activityModel(acti);
  actModel.save(function(err,document) {
    // console.log("from save",document);
  });

}

Promise.all(projectPromises).then(function() {
  memberIds.forEach(function(memberId) {
    schema.projectModel.find({'memberList':{$in:[memberId]}},function(err,docs) {
      var projectIds = [];
      docs.forEach(function(doc) {
        projectIds.push(doc._id);
      });
      // schema.userModel.findById(memberId,function(err,doc) {
      //   console.log(doc);
      // });
      // console.log(projectIds);
      schema.userModel.findByIdAndUpdate(memberId,{$pushAll: { projects:projectIds }},{new:true},function(err,doc) {
      });
    });
  });
});
