const mongoose = require('mongoose');
const _ = require('underscore');
var Schema = mongoose.Schema;

var projectSchema =new Schema({
  name : String,
  description : String,
  date : Date,
  memberList : [{type : Schema.ObjectId, ref : 'User'}],
  release : [
    {
      name : String,
      description : String,
      creationDate : Date,
      releaseDate : Date,
      sprints : [{type : Schema.ObjectId, ref : 'Sprint'}]
    }
  ]
});
var activitySchema = new mongoose.Schema({
  action: String,
  projectID: Schema.Types.ObjectId,
  date: {
    type: Date,
    default: Date.now
  },
  userCreator: {
    fullName: String,
    _id: {type: Schema.Types.ObjectId,ref: 'User'}
  },
  object: {
    name: String,
    kind: String,
    _id: {
      type: Schema.Types.ObjectId,
      refPath: 'object.kind'
    }
  },
  target: {
    name: String,
    kind: String,
    _id: {
      type: Schema.Types.ObjectId,
      refPath: 'target.kind'
    }
  }
});
var sprintSchema = new Schema({
      name: String,
      endDate: Date,
      startDate: Date,
      description: String,
      labelTemplate: [
        {
          text:String,
          colorCode:String
        }
      ],
      list: [
        {
          group: String,
          listName: String,
          stories: [{type : Schema.Types.ObjectId, ref : 'Story'}],
        }
      ]
});
var storySchema = new Schema({
 listId:String,
 storyCreatorId: {type:Schema.Types.ObjectId,ref:'User'},
 storyStatus:String,
 heading: String,
 description: String,
 createdTimeStamp: Date,
 lastUpdated: Date,
 indicators:{
           descriptionStatus: Boolean,
           checklistGroupCount: Number,
           attachmentsCount: Number,
           commentCount: Number
         },
 attachmentList: [{
   fileName: String,
   timeStamp: Date,
   attachmentType:String,
   addedByUserName:String,
   addedByUserId:{type:Schema.Types.ObjectId,ref:'User'},
   path : String
  }],
   checklist: [
     {
       checklistHeading:String,
       checkedCount: Number,
       items: [{
         text: String,
         checked: Boolean,
         createdBy:{type:Schema.Types.ObjectId,ref:'User'},
         creationDate:Date,
         creatorName:String
       }]
     }
   ],
   memberList: [{type:Schema.Types.ObjectId,ref:'User'}],
   labelList:[{type:Schema.Types.ObjectId,ref:'Sprint.labelSchema'}]
});
var backlogBuglistSchema = new Schema({
  projectId: {type : Schema.ObjectId, ref : "Project"},
  backlogs: {
    listName: String,
    stories: [{type : Schema.ObjectId, ref : 'Story'}],
  },
  buglist: {
    listName: String,
    stories: [{type : Schema.ObjectId, ref : 'Story'}],
  }
});
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    createdDate: Date,
    updatedDate: Date,
    password: String,
    email: String,
    initials: String,
    imageUrl: String,
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }]
  });

var schema2 = new Schema({
  name: 'String',
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Model1'
    }
  ]
});

module.exports.projectModel = mongoose.model('Project',projectSchema,"Projects");
module.exports.userModel = mongoose.model('User',userSchema,"Users");
module.exports.storyModal = mongoose.model('Story',storySchema,"Stories");
module.exports.sprintModel = mongoose.model('Sprint',sprintSchema,"Sprints");
module.exports.backlogBuglistModel = mongoose.model('BacklogBuglist',backlogBuglistSchema,"BacklogBuglists");
module.exports.activityModel = mongoose.model('Activity',activitySchema,"Activities");
module.exports.model2 = mongoose.model('Model2',schema2);
