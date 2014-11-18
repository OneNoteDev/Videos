//
// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.
// See License.txt in the project root for license information.
//

#import <UIKit/UIKit.h>
#import "OneNotePickerControllerDelegate.h"

extern NSString *const OneNotePickerControllerSectionID;
extern NSString *const OneNotePickerControllerSectionName;
extern NSString *const OneNotePickerControllerPagesURL;
extern NSString *const OneNotePickerControllerCreatedTime;
extern NSString *const OneNotePickerControllerModifiedTime;
extern NSString *const OneNotePickerControllerLastModifiedBy;

extern NSString *const OneNotePickerControllerIsAPIError;
extern NSString *const OneNotePickerControllerAPIErrorCode;
extern NSString *const OneNotePickerControllerAPIErrorString;
extern NSString *const OneNotePickerControllerAPIErrorURL;
extern NSString *const OneNotePickerControllerSystemError;

@interface OneNotePickerController : UINavigationController

@property (weak, nonatomic) id<UINavigationControllerDelegate, OneNotePickerControllerDelegate> delegate;
@property (strong, nonatomic) NSString *accessToken;
@property (strong, nonatomic) UIColor *navTextColor;
@property (strong, nonatomic) NSString *headerInstructions;

@end
