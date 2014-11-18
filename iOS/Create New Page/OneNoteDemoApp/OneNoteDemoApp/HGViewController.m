//
//  HGViewController.m
//  OneNoteDemoApp
//
//  Created by Demo User on 2014/05/22.
//  Copyright (c) 2014 MyOrganization.com. All rights reserved.
//

#import "HGViewController.h"
#import <LiveSDK/LiveConnectClient.h>
#import "ISO8601DateFormatter.h"

@interface HGViewController () <LiveAuthDelegate, NSURLConnectionDataDelegate>

@property (strong, nonatomic) IBOutlet UIButton *loginButton;
@property (strong, nonatomic) IBOutlet UIButton *createPageButton;
@property (strong, nonatomic) IBOutlet UITextView *textView;

@property (nonatomic, strong) LiveConnectClient *liveClient;
@property (nonatomic, strong) NSURLConnection *urlConnection;
@property (nonatomic, strong) NSHTTPURLResponse *returnedResponse;
@property (nonatomic, strong) NSMutableData *returnedData;

- (IBAction)loginButtonTapped:(id)sender;
- (IBAction)createPageTapped:(id)sender;

@end

@implementation HGViewController

NSString *PagesEndPoint = @"https://www.onenote.com/api/v1.0/pages";
static NSString *ClientId = @"<!-- client Id goes here -->";
static NSString *ScopeStrings = @"wl.signin wl.offline_access Office.OneNote_Create";

- (void)viewDidLoad
{
    [super viewDidLoad];

    NSArray *scopes = [ScopeStrings componentsSeparatedByString:@" "];
    self.liveClient = [[LiveConnectClient alloc] initWithClientId:ClientId
                                                           scopes:scopes
                                                         delegate:self
                                                        userState:@"init"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)loginButtonTapped:(id)sender {
    
    [self authenticate];
}

- (IBAction)createPageTapped:(id)sender {
    
    [self createPage];
}

// This is invoked when the original method call is considered successful.
- (void) authCompleted: (LiveConnectSessionStatus) status
               session: (LiveConnectSession *) session
             userState: (id) userState {
    
    self.textView.text = [NSString stringWithFormat:@"Status: %u\n UserState: %@", status, userState];
    
    if ([userState isEqualToString:@"init"]) {
        
        self.loginButton.enabled = YES;
    }
    
    if ([userState isEqualToString:@"login"] &&
        status == LiveAuthConnected) {
        
        self.createPageButton.enabled = YES;
    }
}

- (void)authenticate {
    
    if (!self.liveClient.session) {
        
        [self.liveClient login:self
                      delegate:self
                     userState:@"login"];
    }
    else {
        
        [self.liveClient logoutWithDelegate:self
                                  userState:@"logout"];
    }
}

- (void)createPage {
    
    NSString *date = dateInISO8601Format();
    
    NSString *simpleHtml = [NSString stringWithFormat:
                            @"<html>"
                            "<head>"
                            "<title>A Sample iOS App Page</title>"
                            "<meta name=\"created\" content=\"%@\" />"
                            "</head>"
                            "<body>"
                            "<p>This is a page that just contains some simple <i>formatted</i> <b>text</b></p>"
                            "<p>Here is a <a href=\"http://www.microsoft.com\">link</a></p>"
                            "<p>Here is an image: <img src=\"http://i.microsoft.com/global/en-us/news/publishingimages/homepage/highlights/prod_xboxone_hl.jpg\" />"
                            "</body>"
                            "</html>", date];
    NSData *presentation = [simpleHtml dataUsingEncoding:NSUTF8StringEncoding];
    
    NSURL *url = [NSURL URLWithString:PagesEndPoint];
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
    request.HTTPMethod = @"POST";
    request.HTTPBody = presentation;
    [request addValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request addValue:@"text/html" forHTTPHeaderField:@"Content-Type"];
    
    if (self.liveClient.session) {
        
        [request setValue:[@"Bearer " stringByAppendingString:self.liveClient.session.accessToken]
       forHTTPHeaderField:@"Authorization"];
    }
    
    self.urlConnection = [[NSURLConnection alloc] initWithRequest:request
                                                         delegate:self
                                                 startImmediately:YES];
}

NSString* dateInISO8601Format() {
    
    ISO8601DateFormatter *isoFormatter = [[ISO8601DateFormatter alloc] init];
    [isoFormatter setDefaultTimeZone: [NSTimeZone localTimeZone]];
    [isoFormatter setIncludeTime:YES];
    NSString *date = [isoFormatter stringFromDate:[NSDate date]];
    return date;
}

// This is invoked when the original method call fails.
- (void) authFailed: (NSError *) error
          userState: (id)userState {
    
    self.textView.text = [NSString stringWithFormat:@"Error: %@\n UserState: %@", [error localizedDescription], userState];
}

- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
    
    self.returnedResponse = (NSHTTPURLResponse *)response;
    self.returnedData = [[NSMutableData alloc] init];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
    
    [self.returnedData appendData:data];
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
    
    int statusCode = self.returnedResponse.statusCode;
    
    NSMutableString *outputString = [NSMutableString stringWithFormat:@"Status code: %u\n", statusCode];
    
    [outputString appendFormat:@"Headers: %@", self.returnedResponse.allHeaderFields];
    [outputString appendFormat:@"Body: %@", [[NSString alloc] initWithData:self.returnedData encoding:NSUTF8StringEncoding]];
    
    self.textView.text = outputString;
}







@end
