//
// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.
// See License.txt in the project root for license information.
//

#import <Foundation/Foundation.h>

@class OneNotePickerController;

@protocol OneNotePickerControllerDelegate <NSObject>

@optional
- (void)oneNotePickerController:(OneNotePickerController *)picker didFinishPickingSectionWithInfo:(NSDictionary *)info;
- (void)oneNotePickerControllerDidCancel:(OneNotePickerController *)picker;
- (void)oneNotePickerController:(OneNotePickerController *)picker didErrorWithInfo:(NSDictionary *)info;

@end
